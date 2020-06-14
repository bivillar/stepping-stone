import React, { FC, useCallback, useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Firebase from '../../utils/base'
import Router from 'next/router'
import Logo from '../../components/Logo'

const { Group, Label, Control } = Form

interface Props {
  history: History
}

const Login: FC<Props> = ({ history }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [firebase, setFirebase] = useState<Firebase | null>(null)

  const handleLogin = useCallback(
    async (event) => {
      setIsLoading(true)
      event.preventDefault()
      const { email, password } = event.target.elements
      const base = firebase ?? new Firebase()
      setFirebase(base)
      base
        .login(email.value, password.value)
        ?.then(() => {
          setIsLoading(false)
          Router.push('/admin/configs')
        })
        .catch(alert)
    },
    [history]
  )

  // const { currentUser } = useContext(AuthContext)

  // if (currentUser) Router.push('/admin/configs')

  return (
    <div>
      <div className="logoDiv fixed">
        <Logo />
      </div>
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
              <Control name="password" type="password" placeholder="Password" />
            </Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <label
              onClick={() => Router.push('/admin/signup')}
              className="ml4 link">
              I don't have an account
            </label>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
