import React, { FC, useContext, useState } from 'react'
import Router from 'next/router'

import Button from '../components/Button'
import { useUser } from '../utils/firebase/useUser'
import Logo from './Logo'

const TopBar: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { logout } = useUser()

  const logOut = async () => {
    setLoading(true)
    logout().then(() => {
      Router.push('/admin')
    })
  }

  return (
    <div className="adminTopBar">
      <div className="logoDiv--admin fixed">
        <Logo />
      </div>
      <div className="flex justify-end">
        <Button isLoading={loading} onClick={logOut}>
          SING OUT
        </Button>
      </div>
    </div>
  )
}

export default TopBar
