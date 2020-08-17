import React, { useState } from 'react'

const BlogForm = ( { createBlog } ) => {
  const [newTitle, setTitleNote] = useState('')
  const [newAuthor, setAuthorNote] = useState('')
  const [newURL, setURLNote] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }
    createBlog(blogObject)

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