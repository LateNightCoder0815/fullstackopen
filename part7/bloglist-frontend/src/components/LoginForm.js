import React, { useState }  from 'react'
import { notificationSet } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button, Typography } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(notificationSet({ message: 'Wrong username or password', type: 'error' },5))
    }
  }
  return(
    <div>
      <Typography variant="h2" gutterBottom>Log in to application</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label="Username" id='username' value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          <TextField label="Password" type="password" id='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <br />
        <div>
          <Button id='login-button' variant="contained" color="primary" type="submit">login</Button>
        </div>
      </form>
    </div>
  )}

export default LoginForm
