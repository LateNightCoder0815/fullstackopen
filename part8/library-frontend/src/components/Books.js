import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(()=> 
        (result.data !== undefined ) ? setBooks(result.data.allBooks) : setBooks([])
    ,[result.data])

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks

  const genres = allBooks.map(b => b.genres)
                      .flat()
                      .filter((v, i, a) => a.indexOf(v) === i); 

  const handleFilter = (genre) => genre 
    ? setBooks(allBooks.filter(b => b.genres.includes(genre))) 
    : setBooks(allBooks)
  
  return (
    <div>
      <h2>books</h2>

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
      {genres.map(g => <button key={g} onClick={() => handleFilter(g)}>{g}</button>)}
      <button onClick={() => handleFilter(null)}>all genres</button>
    </div>
  )
}

export default Books