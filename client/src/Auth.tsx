import React, { useEffect, useState, ReactChildren, ReactElement } from 'react'
import app from './base.js'

interface Props {
  children: ReactElement
}

export const AuthContext = React.createContext({ currentUser: null })

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    //Everytime our authentication changes on firebase we update the current user
    app.auth().onAuthStateChanged(setCurrentUser as any)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
