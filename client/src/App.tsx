import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { sayHello } from './utils/api'
import { Button } from 'react-bootstrap'

class App extends Component {
  handleButtonClick = () => {
    sayHello()
      .then(console.log)
      .catch(console.log)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
          <Button onClick={this.handleButtonClick}>Click</Button>
        </header>
      </div>
    )
  }
}

export default App
