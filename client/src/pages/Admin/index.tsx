import React, { FC, useState, useContext } from 'react'
import Upload from './Upload'
import Container from '../../components/Container'
import { History } from 'history'
import UserList from './UserList'
import { AuthContext } from '../../Auth'

const Admin: FC<Props> = ({ history }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Container page="upload" history={history} className="pl6 pr6">
      <Upload history={history} />
      {currentUser?.isAdmin && <UserList />}
    </Container>
  )
}

interface Props {
  history: History
}

export default Admin
