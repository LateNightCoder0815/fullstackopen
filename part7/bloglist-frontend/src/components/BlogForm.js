import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@material-ui/core'

const BlogForm = ({blogFormRef}) => {
  const [newTitle, setTitleNote] = useState('')
  const [newAuthor, setAuthorNote] = useState('')
  const [newURL, setURLNote] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))

    setTitleNote('')
    setAuthorNote('')
    setURLNote('')
  }

  return(
    <div>
      <form onSubmit={addBlog}>
        <div><TextField label='title' id='title' value={newTitle} onChange={(event) => setTitleNote(event.target.value)}/></div>
        <div><TextField label='author' id='author' value={newAuthor} onChange={(event) => setAuthorNote(event.target.value)}/></div>
        <div><TextField label='url' id='url' value={newURL} onChange={(event) => setURLNote(event.target.value)} /></div>
        <br />
        <div><Button variant="contained" color="primary" type="submit">create</Button></div>
      </form>
    </div>
  )}

export default BlogForm