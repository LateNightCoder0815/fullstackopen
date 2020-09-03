import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import User from './components/User'
import IndividualUser from './components/IndividualUser'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initBlog } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import {
  Switch, Route, Link, useRouteMatch, useHistory
} from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const blogFormRef = useRef()
  useEffect(() => { dispatch(initBlog())}, [dispatch])
  useEffect(() => { dispatch(initUsers())}, [dispatch])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const match = useRouteMatch('/users/:id')
  const selectedUser = match ? users.find(n => n.id === match.params.id) : null

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm />
        :
        <div>
          <h1>Blogs</h1>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Switch>
          <Route path='/users/:id'>
            <IndividualUser user={selectedUser} />
          </Route> 
          <Route path='/users'>
            <h1>Users</h1>
            {users.map(user =>
              <User key={user.id} user={user} />)}
          </Route> 
            <Route path='/'>
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <h2>Create new</h2>
                <BlogForm blogFormRef={blogFormRef}/>
              </Togglable>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user}/>)}
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App