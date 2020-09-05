  
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import Select from "react-select"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [ name, setName ] = useState('')
  const [ setBornTo, setSetBornTo ] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }]})

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name.value, setBornTo: parseInt(setBornTo) } })

    setName('')
    setSetBornTo('')
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthday</h2>

      <form onSubmit={submit}>
        <div> 
          <Select defaultValue={name} onChange={setName} options={authors.map(a => {return({ value: a.name, label: a.name})})} />
        </div>
        <div>
          born <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
