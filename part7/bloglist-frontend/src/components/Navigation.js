import React from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Navigation = ({user}) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <em>{user.name} logged in</em> <button onClick={handleLogout}>logout</button>                           
      </Toolbar>
    </AppBar>
  )
}

export default Navigation