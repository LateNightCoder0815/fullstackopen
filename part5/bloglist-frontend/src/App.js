import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const Notification = ({ message }) => {
  if (message === undefined) {
    return null
  }

  return (
    <div className={message.type}>
      {message.message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [myMessage, setMyMessage] = useState([])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMyMessage({ message: 'Wrong username or password', type: 'error' })
      setTimeout(() => setMyMessage([]), 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      setMyMessage({ message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, type: 'success' })
      setTimeout(() => setMyMessage([]), 5000)
    } catch(exception) {
      setMyMessage({ message: 'Failed to add blog', type: 'error' })
      setTimeout(() => setMyMessage([]), 5000)
    }
  }

  const handleLike = async (blogObject) => {
    const updatedBlog = {
      user: blogObject.user,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }
    try {
      const returnedBlog = await blogService.change(updatedBlog, blogObject.id)
      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
      setMyMessage({ message: `Added one like to ${returnedBlog.title} by ${returnedBlog.author}`, type: 'success' })
      setTimeout(() => setMyMessage([]), 5000)
    } catch(exception) {
      setMyMessage({ message: 'Failed to add like', type: 'error' })
      setTimeout(() => setMyMessage([]), 5000)
    }
  }

  const handleRemove = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setMyMessage({ message: `Removed ${blogObject.title} by ${blogObject.author}`, type: 'success' })
        setTimeout(() => setMyMessage([]), 5000)
      } catch(exception) {
        setMyMessage({ message: 'Failed to remove blog', type: 'error' })
        setTimeout(() => setMyMessage([]), 5000)
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs.sort((a,b) => b.likes - a.likes ) ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={myMessage} />
      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} password={password}
          setUsername={setUsername} setPassword={setPassword}/>
        :
        <div>
          <h1>Blogs</h1>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <h2>Create new</h2>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove = {handleRemove} user={user}/>)}
        </div>
      }
    </div>
  )
}

export default App