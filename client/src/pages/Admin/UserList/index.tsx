import React, { FC, useEffect, useState, useContext } from 'react'
import { Table, Spinner, Button } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

import Firebase from '../../../base'
import TableItemSkeleton from './TableItemSkeleton'
import TableItem from './TableItem'
import { AddUser, Uncheck, Check } from '../Icons'
import TableItemForm from './TableItemForm'
import { AuthContext } from '../../../Auth'

const UserList: FC<Props> = () => {
  const { currentUser } = useContext(AuthContext)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isEditing, setEditing] = useState<boolean>(false)
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    if (!currentUser?.canManageUsers) return
    Firebase.getAllUsers().then(users => {
      setUsers(users)
      setLoading(false)
    })
  }, [])

  if (!currentUser?.canManageUsers)
    return (
      <div className="adminContainer">
        <h1>Para ter acesso, você precisa pedir à um dos admins.</h1>
      </div>
    )

  const handleAddUser = (user: User) => {
    setUsers([...users, user])
    setIsAddingUser(false)
    setEditing(false)
  }

  return (
    <div className="adminContainer">
      <div className="flex justify-between items-center">
        <h1> Lista de usuários</h1>
        <div className="pr2">
          {isAddingUser ? (
            <Button
              variant="danger"
              onClick={() => {
                setEditing(false)
                setIsAddingUser(false)
              }}>
              <Uncheck />
            </Button>
          ) : (
            <Button
              onClick={() => {
                setEditing(true)
                setIsAddingUser(true)
              }}>
              <AddUser />
            </Button>
          )}
        </div>
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <th className="w-20">Nome</th>
            <th className="w-30">Email</th>
            <th className="w-20">Fazer Upload</th>
            <th className="w-25">Gerenciar Usuários</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <TableItemSkeleton />
          ) : (
            users?.map(user => (
              <TableItem
                key={user.email}
                user={user}
                setEditing={setEditing}
                disabled={isEditing || currentUser.email == user.email}
              />
            ))
          )}
          {isAddingUser && <TableItemForm handleAddUser={handleAddUser} />}
        </tbody>
      </Table>
    </div>
  )
}

interface Props {}

export default UserList
