import React, { FC, useCallback } from 'react'
import { History } from 'history'
import { Form, Button } from 'react-bootstrap'
import app from '../../base'

const { Group, Label, Control, Text } = Form

interface Props {
  history: History
}

const SignUp: FC<Props> = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(() => history.push('/'))
        .catch(alert)
    },
    [history]
  )
  return (
    <>
      <h1>SignUp</h1>
      <Form onSubmit={handleSignUp}>
        <Group controlId="email">
          <Label>Email address</Label>
          <Control name="email" type="email" placeholder="Enter email" />
          <Text className="text-muted">
            We'll never share your email with anyone else.
          </Text>
        </Group>
        <Group controlId="password">
          <Label>Password</Label>
          <Control name="password" type="password" placeholder="Password" />
        </Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default SignUp
