import React, { useState } from 'react'
import { increaseLike, removeBlog, addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

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
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <p>{blog.url}</p>
        <p className='likesDisplay'>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></p>
        <p>added by {blog.user.name}</p>
        <p style={showRemove}><button onClick={() => handleRemove(blog)}>remove</button></p>
        <b>comments</b>
        <form onSubmit={handleComment}>
          <input value={newComment} onChange={(event) => setComment(event.target.value)} />
          <button type="submit">add comment</button>
        </form>
        <ul>
        {blog.comments.map(comment => 
          <li key={comment.id}>{comment.comment}</li>)}
        </ul>
      </div>
    </div>
  )}

export default Blog
