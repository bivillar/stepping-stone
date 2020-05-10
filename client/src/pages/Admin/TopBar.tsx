import React, { FC, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { History } from 'history'

import { AuthContext } from '../../Auth'
import Firebase from '../../base'
import Logo from '../../components/Logo'

const TopBar: FC<Props> = ({ history }) => {
  const { currentUser } = useContext(AuthContext)
  if (!currentUser) return <></>

  const logOut = async () => {
    await Firebase.logout()
    history.push('/admin/login')
  }

  return (
    <div className="adminTopBar">
      <div className="logoDiv--admin fixed">
        <Logo />
      </div>
      <div className="flex justify-end">
        {currentUser?.name}
        <Button onClick={logOut}>SING OUT</Button>
      </div>
    </div>
  )
}

interface Props {
  history: History
}

export default TopBar
