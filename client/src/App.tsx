import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import { sayHello } from './utils/api'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { AuthProvider } from './Auth'
import PrivateRoute from './PrivateRoute'

class App extends Component {
  handleButtonClick = () => {
    sayHello()
      .then(console.log)
      .catch(console.log)
  }

  render() {
    return (
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </Router>
      </AuthProvider>
    )
  }
}

export default App
