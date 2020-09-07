import React, { useState, useEffect } from 'react'
import { ALL_BOOKS_GENRE, ME_USER } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/client'

const Recommendation = (props) => {
  const result = useQuery(ME_USER)
  const [getBooks, resultBooks] = useLazyQuery(ALL_BOOKS_GENRE) 

  const [books, setBooks] = useState([])

  useEffect(()=> {
    if (result.data !== undefined ){
      if (result.data.me !== null ){
        getBooks({ variables: { genre: result.data.me.favoriteGenre } })
      }
    } 
  },[result.data]) // eslint-disable-line

  useEffect(() => {
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks)
    }
  }, [resultBooks.data])

  if (!props.show) {
    return null
  }

  if (resultBooks.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favourite genre <b>{result.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendation