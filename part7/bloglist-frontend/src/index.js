import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"
import Container from '@material-ui/core/Container'

ReactDOM.render(
    <Provider store={store}>
      <Container>
        <Router>
          <App />
        </Router>
      </Container>
    </Provider>,
    document.getElementById('root')
  )