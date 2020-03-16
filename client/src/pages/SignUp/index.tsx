import React, { FC, useCallback, useState } from 'react'
import { History } from 'history'
import { Form } from 'react-bootstrap'

import app from '../../base'
import Button from '../../components/Button'
import Container from '../../components/Container'

const { Group, Label, Control, Text } = Form

interface Props {
  history: History
}

const SignUp: FC<Props> = ({ history }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignUp = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(() => {
          setIsLoading(false)
          history.push('/upload')
        })
        .catch(alert)
    },
    [history]
  )
  return (
    <Container page="signup" history={history} className="pl6 pr6">
      <h1>SignUp</h1>
      <Form onSubmit={handleSignUp}>
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
        <label onClick={() => history.push('/login')} className="ml4 link">
          I have an account
        </label>
      </Form>
    </Container>
  )
}

export default SignUp
