import React, { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'

import { Uncheck, Check, Edit } from '../Icons'
import Firebase from '../../../base'

const TableItem: FC<Props> = ({
  user: {
    email,
    name,
    canUpload: usercanUpload,
    canManageUsers: userManageUser,
  },
  setEditing,
  disabled,
}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [canUpload, setcanUpload] = useState<boolean>(usercanUpload || false)
  const [canManageUsers, setcanManageUsers] = useState<boolean>(
    userManageUser || false
  )

  const mark = (value: boolean) =>
    value ? (
      <span className="c-success" style={{ fontSize: 25 }}>
        <Check />
      </span>
    ) : (
      <span className="c-danger" style={{ fontSize: 25 }}>
        <Uncheck />
      </span>
    )

  const handleEdit = () => {
    setEdit(true)
    setEditing(true)
  }
  const handleSave = () => {
    debugger
    Firebase.updateUser(email, canUpload, canManageUsers).then(() => {
      setEdit(false)
      setEditing(false)
    })
  }

  return (
    <tr key={email}>
      <td>{name}</td>
      <td>{email}</td>
      <td className="tc">
        {edit ? (
          <InputGroup.Checkbox
            checked={canUpload}
            onChange={() => setcanUpload(!canUpload)}
          />
        ) : (
          mark(canUpload)
        )}
      </td>
      <td className="tc">
        {edit ? (
          <InputGroup.Checkbox
            checked={canManageUsers}
            onChange={() => {
              if (!canManageUsers) setcanUpload(true)
              setcanManageUsers(!canManageUsers)
            }}
          />
        ) : (
          mark(canManageUsers)
        )}
      </td>

      <td>
        {edit ? (
          <Button variant="success" size="sm" onClick={handleSave}>
            <Check />
          </Button>
        ) : (
          <Button
            disabled={disabled}
            variant="secondary"
            size="sm"
            onClick={handleEdit}>
            <Edit />
          </Button>
        )}
      </td>
    </tr>
  )
}

interface Props {
  user: User
  setEditing: (isEditin: boolean) => void
  disabled: boolean
}

export default TableItem
