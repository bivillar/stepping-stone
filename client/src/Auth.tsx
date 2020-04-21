import React, { useEffect, useState } from 'react'
import { User as FirebaseUser } from 'firebase'
import Firebase from './base'

type CurrentUser = FirebaseUser & User

export const AuthContext = React.createContext<{
  currentUser: CurrentUser | null
}>({
  currentUser: null,
})

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    Firebase.auth?.onAuthStateChanged(async firebaseUser => {
      const user = await Firebase.getCurrentUser()
      if (!user) return
      const cUser = ({ ...firebaseUser, ...user } as unknown) as CurrentUser
      console.log(cUser)
      setCurrentUser(cUser)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
