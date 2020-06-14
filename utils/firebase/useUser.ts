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
      .then(async ({ user }) => {
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
      })
  }

  const register = async (name: string, email: string, password: string) => {
    const permissions = await getUserPermissions(email)
    if (!permissions) throw new Error('Sem autorização')

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    return firebase.auth().currentUser?.updateProfile({
      displayName: name,
    })
  }

  const getUserPermissions = async (email: string) => {
    const user = await firebase.firestore().collection('users').doc(email).get()
    const canManageUsers = user.get('canManageUsers')
    const canConfig = user.get('canConfig')
    return { canManageUsers, canConfig }
  }

  useEffect(() => {
    const cookie = cookies.get('auth')
    if (!cookie) {
      router.push('/admin/login')
      return
    }
    setCurrentUser(JSON.parse(cookie))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { currentUser, logout, login, register }
}

export { useUser }
