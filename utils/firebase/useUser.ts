import { LOGIN_URL, SIGNUP_URL } from './../constants'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import cookies from 'js-cookie'
import firebase from 'firebase/app'
import 'firebase/auth'

import initFirebase from './auth/initFirebase'
import Firebase from './base'

initFirebase()

const useUser = () => {
  const [currentUser, setCurrentUser] = useState<User>()
  const router = useRouter()

  const setCookie = async ({ user }: firebase.auth.UserCredential) => {
    if (!user) return
    const base = new Firebase()
    const { uid, email } = user
    if (!email) return

    const data = await base.getUser(email)
    const userData = {
      ...data,
      id: uid,
      email,
    }
    cookies.set('auth', userData, {
      expires: 1,
    })
  }

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        cookies.remove('auth')
        // router.push('/auth')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const login = async (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(setCookie)
  }

  const register = async (name: string, email: string, password: string) => {
    const credentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    setCookie(credentials)
    return firebase.auth().currentUser?.updateProfile({
      displayName: name,
    })
  }

  useEffect(() => {
    const cookie = cookies.get('auth')

    if (!cookie) {
      if (![LOGIN_URL, SIGNUP_URL].includes(window?.location?.pathname))
        router.push('/admin/login')
      return
    }
    setCurrentUser(JSON.parse(cookie))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { currentUser, logout, login, register }
}

export { useUser }
