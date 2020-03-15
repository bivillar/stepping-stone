import React, { FC, useCallback, useContext, useState } from 'react'
import { History } from 'history'
import { Form } from 'react-bootstrap'
import app from '../../base'
import { AuthContext } from '../../Auth'
import { Redirect } from 'react-router'
import Button from '../../components/Button'
import Container from '../../components/Container'

const { Group, Label, Control, Text } = Form

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
      app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
          setIsLoading(false)
          history.push('/upload')
        })
        .catch(alert)
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) return <Redirect to="/upload" />

  return (
    <Container page="login" history={history}>
      <h1>Log in</h1>
      <Form onSubmit={handleLogin}>
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
        <Button variant="primary" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Login
