import React, { FC, useContext, ReactNode } from 'react'
import { Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap'
import { AuthContext } from '../Auth'
import app from '../base'
import { History } from 'history'

interface Props {
  page: string
  history: History
  children?: ReactNode
}

const Container: FC<Props> = ({ history, children }) => {
  const { currentUser } = useContext(AuthContext)

  const goTo = (location: string) => {
    history.push(location)
  }

  return (
    <>
      <BootstrapNavbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <BootstrapNavbar.Brand onClick={() => goTo('/')}>
          Stepping Stone
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => goTo('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => goTo('/upload')}>Upload</Nav.Link>
          </Nav>
          <Nav>
            {currentUser ? (
              <Nav.Link onClick={() => app.auth().signOut()}>Sign out</Nav.Link>
            ) : (
              <Nav.Link onClick={() => goTo('/login')}>Sign in</Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
      <div className="container">{children}</div>
    </>
  )
}

export default Container
