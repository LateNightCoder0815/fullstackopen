const { ApolloServer, UserInputError,  gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('apollo-server')
const { find } = require('./models/book')
const pubsub = new PubSub()

const JWT_SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
mongoose.set('useFindAndModify', false)
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    books: [Book!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate('author')
      if (args.author){
         filteredBooks = filteredBooks.filter(b => b.author.name === args.author)
      }
      if (args.genre){
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      }
      return filteredBooks
    },
    allAuthors: () => Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation:{
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const findAuthor = await Author.findOne({ name: args.author})
      try {
        if(!findAuthor){
          const author = new Author({ name: args.author })
          const savedAuthor = await author.save()

          const book = new Book({... args, author: savedAuthor})
          const result = await book.save()

          // Update reference
          savedAuthor.books = [result]
          savedAuthor.save()

          pubsub.publish('BOOK_ADDED', { bookAdded: result })
          return result
        }else{
          const book = new Book({... args, author: findAuthor})
          const result = await book.save()

          //Update reference
          findAuthor.books = findAuthor.books.concat(result)
          findAuthor.save()
          pubsub.publish('BOOK_ADDED', { bookAdded: result })
          return result
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
       
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne( { name: args.name } )
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try{
        author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
