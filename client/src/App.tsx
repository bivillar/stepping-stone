import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import { AuthProvider } from './Auth'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Upload from './pages/Upload'
import './App.css'

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/upload" component={Upload} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </Router>
      </AuthProvider>
    )
  }
}

export default App
