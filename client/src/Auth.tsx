import React, { useEffect, useState } from 'react'
import { User } from 'firebase'
import app from './base'

export const AuthContext = React.createContext<{ currentUser: User | null }>({
  currentUser: null,
})

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser)
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
