import React, { FC, useEffect, useState } from 'react'
import { Table, Spinner, Button } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

import Firebase from '../../../base'
import TableItemSkeleton from './TableItemSkeleton'
import TableItem from './TableItem'
import { AddUser } from '../Icons'

const UserList: FC<Props> = () => {
  const [users, setUsers] = useState<User[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isEditing, setEditing] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    Firebase.getAllUsers().then(users => {
      setUsers(users)
      setLoading(false)
    })
  }, [])

  return (
    <div className="adminContainer">
      <div className="flex justify-between items-center">
        <h1> Lista de usuários</h1>
        <div className="pr2">
          <Button>
            <AddUser />
          </Button>
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
              <>
                <TableItem
                  user={user}
                  setEditing={setEditing}
                  disabled={isEditing}
                />
                <TableItem
                  user={user}
                  setEditing={setEditing}
                  disabled={isEditing}
                />
              </>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}

interface Props {}

export default UserList
