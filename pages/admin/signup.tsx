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
import { CONFIGS_URL, LOGIN_URL } from '../../utils/constants'
import Logo from '../../components/Logo'
import Loading from '../../components/Loading'
import Button from '../../components/Button'
import Firebase from '../../utils/firebase/base'

// Init the Firebase app.
initFirebase()

const { Group, Label, Control } = Form

const SignUp = () => {
  const { currentUser, register } = useUser()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [renderAuth, setRenderAuth] = useState(false)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
    setIsRendered(true)
  }, [])

  const handlSignUp = useCallback(async (event) => {
    setIsLoading(true)
    event.preventDefault()
    const { email, password, name } = event.target.elements

    const base = new Firebase()
    const exists = await base.doesUserExists(email.value)
    if (exists) {
      register(name.value, email.value, password.value).then(() => {
        Router.push(CONFIGS_URL)
      })
    } else {
      setIsLoading(false)
      alert(
        'Sem permissão. Você precisa pedir à algum admin para te adicionar a lista de usuários.'
      )
    }
  }, [])

  if (currentUser) {
    Router.push(CONFIGS_URL)
  }

  if (!isRendered) return <Loading />

  return (
    <div>
      <div className="loginLogo">
        <Logo />
      </div>
      {renderAuth && (
        <div className="loginContent">
          <div className="loginContainer">
            <h1 className="ma0 mb4">Criar conta</h1>
            <Form onSubmit={handlSignUp}>
              <Group controlId="name">
                <Label>Nome</Label>
                <Control
                  name="name"
                  type="name"
                  placeholder="Escreva seu nome"
                />
              </Group>
              <Group controlId="email">
                <Label>Email</Label>
                <Control
                  name="email"
                  type="email"
                  placeholder="Escreva seu email"
                />
              </Group>
              <Group controlId="password">
                <Label>Senha</Label>
                <Control name="password" type="password" placeholder="Senha" />
              </Group>
              <Button
                variant="primary"
                type="submit"
                isLoading={isLoading}
                showText>
                Entrar
              </Button>
              <label
                onClick={() => Router.push(LOGIN_URL)}
                className="ml4 link pointer">
                Já tenho conta
              </label>
            </Form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUp
