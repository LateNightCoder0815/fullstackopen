import React, { useState } from 'react'
import { increaseLike, removeBlog, addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button, Typography } from '@material-ui/core'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [newComment, setComment] = useState('')

  if(!blog){
    return null
  }

  const handleLike = (blog) => {
    dispatch(increaseLike(blog))
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    dispatch(addComment(blog,newComment))

    setComment('')
  }

  const showRemove = { display:  (typeof blog.user !== 'undefined' && user.username === blog.user.username) ? '' : 'none' }

  return(
    <div >
      <Typography variant="h3" gutterBottom>{blog.title} {blog.author}</Typography>
      <div>
        <p>{blog.url}</p>
        <p className='likesDisplay'>{blog.likes} likes <Button variant="contained" color="primary" onClick={() => handleLike(blog)}>like</Button></p>
        <p>added by {blog.user.name}</p>
        <p style={showRemove}><Button variant="contained" color="secondary" onClick={() => handleRemove(blog)}>remove</Button></p>
        <Typography variant="h4" gutterBottom>Comments</Typography>
        <form onSubmit={handleComment}>
          <TextField label='comment' value={newComment} onChange={(event) => setComment(event.target.value)}  />
          <Button type="submit" variant="contained" color="primary">add comment</Button>
        </form>
        <ul>
        {blog.comments.map(comment => 
          <li key={comment.id}>{comment.comment}</li>)}
        </ul>
      </div>
    </div>
  )}

export default Blog
