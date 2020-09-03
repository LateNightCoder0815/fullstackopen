import React,{ useState } from 'react'
import { increaseLike, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)
  const dispatch = useDispatch()

  const handleLike = (blog) => {
    dispatch(increaseLike(blog))
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemove = { display:  (typeof blog.user !== 'undefined' && user.username === blog.user.username) ? '' : 'none' }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}<button onClick={() => toggleVisibility()}>view</button>
      </div>
      <div className='blogDetails' style={showWhenVisible}>
        {blog.title} <button onClick={() => toggleVisibility()}>hide</button>
        <p>{blog.url}</p>
        <p className='likesDisplay'>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
        <p>{blog.user.name}</p>
        <p style={showRemove}><button onClick={() => handleRemove(blog)}>remove</button></p>
      </div>
    </div>
  )}

export default Blog
