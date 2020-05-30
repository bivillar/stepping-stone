import React, { FC, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { History } from 'history'

import { AuthContext } from '../../Auth'
import Firebase from '../../base'
import Logo from '../../components/Logo'
import { AdminPagesEnum } from '../../constants'

const TopBar: FC<Props> = ({ history }) => {
  const { currentUser } = useContext(AuthContext)

  const logOut = async () => {
    await Firebase.logout()
    history.push(AdminPagesEnum.Login)
  }

  return (
    <div className="adminTopBar">
      <div className="logoDiv--admin fixed">
        <Logo />
      </div>
      <div className="flex justify-end">
        <Button onClick={logOut}>SING OUT</Button>
      </div>
    </div>
  )
}

interface Props {
  history: History
}

export default TopBar