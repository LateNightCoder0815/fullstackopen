import React from 'react'
import { increaseLike, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

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
      </div>
    </div>
  )}

export default Blog
