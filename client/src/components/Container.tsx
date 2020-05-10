import React, { FC, useContext, ReactNode } from 'react'
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap'
import { AuthContext } from '../Auth'
import firebase from '../base'
import { History } from 'history'
import { AdminPagesEnum } from '../constants'

interface Props {
  page: string
  history: History
  children?: ReactNode
  className?: string
  container?: boolean
  fillPage?: boolean
}

const Container: FC<Props> = ({
  container = false,
  page,
  history,
  children,
  className,
  fillPage,
}) => {
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
    <div className={fillPage ? 'fillPage' : ''}>
      <BootstrapNavbar collapseOnSelect expand="lg" bg="" variant="dark">
        <BootstrapNavbar.Brand onClick={() => goTo('/')}>
          <img
            src="icon.png"
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
              onClick={() => goTo('/admin')}>
              Upload
            </Nav.Link>
          </Nav>
          <Nav>
            {currentUser ? (
              <Nav.Link onClick={() => firebase.logout()}>Sign out</Nav.Link>
            ) : (
              <Nav.Link
                className={classNames.login}
                onClick={() => goTo(AdminPagesEnum.Login)}>
                Sign in
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
      <div
        className={`${container ? 'container' : ''} ${className ??
          ''} fillPage `}>
        {children}
      </div>
    </div>
  )
}

export default Container
