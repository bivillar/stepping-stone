import React, { FC, useCallback, useContext, useState } from 'react'
import { History } from 'history'
import { Redirect } from 'react-router'
import { Form } from 'react-bootstrap'

import Firebase from '../../../base'
import { AuthContext } from '../../../Auth'
import Button from '../../../components/Button'
import Logo from '../../../components/Logo'
import { AdminPagesEnum } from '../../../constants'

const { Group, Label, Control } = Form

interface Props {
  history: History
}

const Login: FC<Props> = ({ history }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleLogin = useCallback(
    async event => {
      setIsLoading(true)
      event.preventDefault()
      const { email, password } = event.target.elements
      Firebase.login(email.value, password.value)
        ?.then(() => {
          setIsLoading(false)
          history.push(AdminPagesEnum.Upload)
        })
        .catch(alert)
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) return <Redirect to="/admin/upload" />

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
            <Button variant="primary" type="submit" isLoading={isLoading}>
              Submit
            </Button>
            <label
              onClick={() => history.push(AdminPagesEnum.SignUp)}
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
