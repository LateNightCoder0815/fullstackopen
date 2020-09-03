import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

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
        <div>title: <input id='title' value={newTitle} onChange={(event) => setTitleNote(event.target.value)} /></div>
        <div>author: <input id='author' value={newAuthor} onChange={(event) => setAuthorNote(event.target.value)} /></div>
        <div>url: <input id='url' value={newURL} onChange={(event) => setURLNote(event.target.value)} /></div>
        <div><button type="submit">create</button></div>
      </form>
    </div>
  )}

export default BlogForm