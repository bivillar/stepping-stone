import React, { FC, useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { BsX as XIcon, BsPersonPlus as PersonPlusIcon } from 'react-icons/bs'

import { useUser } from '../../utils/firebase/useUser'
import Firebase from '../../utils/firebase/base'
import Button from '../../components/Button'
import AdminContainer from '../../components/AdminContainer'
import TableItemForm from '../../components/usersTable/TableItemForm'
import TableItem from '../../components/usersTable/TableItem'
import TableItemSkeleton from '../../components/usersTable/TableItemSkeleton'

const Users: FC = () => {
  const { currentUser } = useUser()
  const [users, setUsers] = useState<User[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isEditing, setEditing] = useState<boolean>(false)
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)

  useEffect(() => {
    const base = new Firebase()
    base.getAllUsers().then((baseUsers) => {
      setUsers(baseUsers)
      setLoading(false)
    })
  }, [users])

  const handleAddUser = (user: User) => {
    setUsers([...users, user])
    setIsAddingUser(false)
    setEditing(false)
  }

  return (
    <AdminContainer hasPermission={currentUser?.canManageUsers}>
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
                <XIcon />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setEditing(true)
                  setIsAddingUser(true)
                }}>
                <PersonPlusIcon />
              </Button>
            )}
          </div>
        </div>
        <Table responsive hover>
          <thead>
            <tr>
              <th className="w-20">Nome</th>
              <th className="w-30">Email</th>
              <th className="w-20">Gerenciar Posts</th>
              <th className="w-25">Gerenciar Usuários</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableItemSkeleton />
            ) : (
              users?.map((user) => (
                <TableItem
                  key={user.email}
                  user={user}
                  setEditing={setEditing}
                  disabled={isEditing || currentUser?.email == user.email}
                />
              ))
            )}
            {isAddingUser && <TableItemForm handleAddUser={handleAddUser} />}
          </tbody>
        </Table>
      </div>
    </AdminContainer>
  )
}

export default Users
