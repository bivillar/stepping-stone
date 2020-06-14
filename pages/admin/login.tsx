/* globals window */
import React, { useEffect, useState, useCallback } from 'react'
import { Form } from 'react-bootstrap'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import cookie from 'js-cookie'
import Router from 'next/router'

import initFirebase from '../../utils/firebase/auth/initFirebase'
import { useUser } from '../../utils/firebase/useUser'
import { SIGNUP_URL, CONFIGS_URL } from '../../utils/constants'
import Logo from '../../components/Logo'
import Loading from '../../components/Loading'
import Button from '../../components/Button'

// Init the Firebase app.
initFirebase()

const { Group, Label, Control } = Form

const Login = () => {
  const { currentUser, login } = useUser()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [renderAuth, setRenderAuth] = useState(false)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
    setIsRendered(true)
  }, [])

  const handleLogin = useCallback(async (event) => {
    setIsLoading(true)
    event.preventDefault()
    const { email, password } = event.target.elements
    login(email.value, password.value)
      ?.then(() => {
        Router.push(CONFIGS_URL)
      })
      .catch(alert)
  }, [])

  if (currentUser) {
    Router.push(CONFIGS_URL)
  }

  if (!isRendered) return <Loading />

  return (
    <div>
      <div className="logoDiv fixed">
        <Logo />
      </div>
      {renderAuth && (
        <div className="loginContent">
          <div className="loginContainer">
            <h1 className="ma0">Log in</h1>
            <Form onSubmit={handleLogin}>
              <Group controlId="email">
                <Label>Email address</Label>
                <Control name="email" type="email" placeholder="Enter email" />
              </Group>
              <Group controlId="password">
                <Label>Password</Label>
                <Control
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </Group>
              <Button
                variant="primary"
                type="submit"
                isLoading={isLoading}
                showText>
                Submit
              </Button>
              <label
                onClick={() => Router.push(SIGNUP_URL)}
                className="ml4 link">
                I don't have an account
              </label>
            </Form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
