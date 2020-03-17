import React, { FC, useContext, ReactNode } from 'react'
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap'
import { AuthContext } from '../Auth'
import app from '../base'
import { History } from 'history'

interface Props {
  page: string
  history: History
  children?: ReactNode
  className?: string
}

const Container: FC<Props> = ({ page, history, children, className }) => {
  const { currentUser } = useContext(AuthContext)

  const goTo = (location: string) => {
    history.push(location)
  }

  const classNames = {
    home: page.toLowerCase() === 'home' ? 'focus' : '',
    upload: page.toLowerCase() === 'upload' ? 'focus' : '',
    login: page.toLowerCase() === 'login' ? 'focus' : '',
  }

  return (
    <>
      <BootstrapNavbar collapseOnSelect expand="lg" bg="" variant="dark">
        <BootstrapNavbar.Brand onClick={() => goTo('/')}>
          <img
            src="icon.png"
            alt="Smiley face"
            style={{ maxHeight: '30px', paddingRight: '10px' }}
          />
          stepping stone
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className={classNames.home} onClick={() => goTo('/')}>
              Home
            </Nav.Link>
            <Nav.Link
              className={classNames.upload}
              onClick={() => goTo('/upload')}>
              Upload
            </Nav.Link>
          </Nav>
          <Nav>
            {currentUser ? (
              <Nav.Link onClick={() => app.auth().signOut()}>Sign out</Nav.Link>
            ) : (
              <Nav.Link
                className={classNames.login}
                onClick={() => goTo('/login')}>
                Sign in
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
      <div className={`container ${className ?? ''}`}>{children}</div>
    </>
  )
}

export default Container
