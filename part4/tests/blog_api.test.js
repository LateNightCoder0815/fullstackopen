const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const testUser = {
  username: 'root',
  password: 'sekret'
}

const loginUser = async () => {
  const loggedInUser = await api
    .post('/api/login')
    .send(testUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return loggedInUser.body.token
}

beforeEach(async () => {
  // Create test user for adding blogs
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash(testUser.password, 10)
  const user = new User({ username: testUser.username, passwordHash })
  await user.save()

  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(titles).toContain('React patterns')
})

test('unique identifier is replaced by id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})


test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Full Stack Open 2020',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${await loginUser()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'Full Stack Open 2020'
  )
})

test('likes property defaults to 0', async () => {
  const newBlog = {
    title: 'Jest Blog',
    author: 'various',
    url: 'https://jestjs.io/blog/'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${await loginUser()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('Bad request on missing title and url', async () => {
  const newBlog = {
    author: 'various',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${await loginUser()}`)
    .send(newBlog)
    .expect(400)
})


test('create and delete blog', async () => {
  const newBlog = {
    title: 'Jest Blog v2',
    author: 'various',
    url: 'https://jestjs.io/'
  }
  const myUser = await loginUser()
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${myUser}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  await api.delete(`/api/blogs/${response.body.id}`).set('Authorization', `bearer ${myUser}`).expect(204)
})


test('create and change a blog', async () => {
  const newBlog = {
    title: 'Jest Blog v2',
    author: 'various',
    url: 'https://jestjs.io/'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${await loginUser()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  newBlog.likes = 4
  const putResponse = await api.put(`/api/blogs/${response.body.id}`).send(newBlog).expect(200)
  expect(putResponse.body.likes).toBe(newBlog.likes)
})

test('a blog can not be added without token', async () => {
  const newBlog = {
    title: 'Full Stack Open 2020',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

})

afterAll(() => {
  mongoose.connection.close()
})