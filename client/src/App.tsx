import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { AuthProvider } from './Auth'
import Home from './pages/Home'
import Admin from './pages/Admin'

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
          </div>
        </Router>
      </AuthProvider>
    )
  }
}

export default App
