
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendation from './components/Recommendation'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const Links = ({loggedIn, setPage, setToken}) => {
  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (loggedIn){
    return (<>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('recommend')}>recommend</button>
      <button onClick={logout}>logout</button>
    </>);
  } else {
    return <button onClick={() => setPage('login')}>login</button>;
  }
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const localUserToken = window.localStorage.getItem('library-user-token')
    if (localUserToken) {
      setToken(localUserToken)
    }
  }, [])

  // Subscriptions
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.title).includes(object.title)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      window.alert(`The book ${addedBook.title} was added!`)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <Links loggedIn={token} setPage={setPage} setToken={setToken}/>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />

      <Recommendation
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App