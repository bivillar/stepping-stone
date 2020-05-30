import React, { FC, useCallback, useState } from 'react'
import { History } from 'history'
import { Form } from 'react-bootstrap'

import Firebase from '../../../base'
import Button from '../../../components/Button'
import Logo from '../../../components/Logo'
import { AdminPagesEnum } from '../../../constants'

const { Group, Label, Control } = Form

interface Props {
  history: History
}

const SignUp: FC<Props> = ({ history }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignUp = useCallback(
    async event => {
      event.preventDefault()
      const { email, password, name } = event.target.elements
      Firebase.register(name.value, email.value, password.value)
        .then(() => {
          setIsLoading(false)
          history.push(AdminPagesEnum.Upload)
        })
        .catch(alert)
    },
    [history]
  )
  return (
    <div>
      <div className="logoDiv fixed">
        <Logo />
      </div>
      <div className="loginContent">
        <div className="loginContainer">
          <h1 className="ma0">SignUp</h1>
          <Form onSubmit={handleSignUp}>
            <Group controlId="name">
              <Label>Name</Label>
              <Control name="name" type="name" placeholder="Enter Name" />
            </Group>
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
              onClick={() => history.push(AdminPagesEnum.Login)}
              className="ml4 link">
              I have an account
            </label>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignUp