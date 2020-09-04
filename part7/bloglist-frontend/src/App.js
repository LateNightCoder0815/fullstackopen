import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import IndividualUser from './components/IndividualUser'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initBlog } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { Typography} from '@material-ui/core'
import Blogs from './components/Blogs'
import Users from './components/Users'

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

  const match = useRouteMatch('/users/:id')
  const selectedUser = match ? users.find(n => n.id === match.params.id) : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const selectedBlog = matchBlog ? blogs.find(n => n.id === matchBlog.params.id) : null

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm />
        :
        <div>
          <Navigation user={user} />
          <Typography variant="h2" gutterBottom>Blog App</Typography>
          <Switch>
            <Route path='/users/:id'>
              <IndividualUser user={selectedUser} />
            </Route> 
            <Route path='/users'>
              <Typography variant="h3" gutterBottom>Users</Typography>
              <Users users={users}/>
            </Route> 
            <Route path='/blogs/:id'>
              <Blog blog={selectedBlog} user={user}/>
            </Route>
            <Route path='/'>
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <h2>Create new</h2>
                <BlogForm blogFormRef={blogFormRef}/>
              </Togglable>
              <br />
              <Blogs blogs={blogs}/>
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App