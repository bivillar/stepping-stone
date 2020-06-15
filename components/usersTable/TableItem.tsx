import React, { FC, useState } from 'react'
import Button from '../Button'
import InputGroup from 'react-bootstrap/InputGroup'
import {
  BsCheck as CheckIcon,
  BsX as XIcon,
  BsPencil as EditIcon,
} from 'react-icons/bs'

import Firebase from '../../utils/firebase/base'
import BooleanIcon from '../BooleanIcon'

const TableItem: FC<Props> = ({
  user: {
    email,
    name,
    canConfig: usercanConfig,
    canManageUsers: userManageUser,
  },
  setEditing,
  disabled,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [canConfig, setcanConfig] = useState<boolean>(usercanConfig || false)
  const [canManageUsers, setcanManageUsers] = useState<boolean>(
    userManageUser || false
  )

  const handleEdit = () => {
    setEdit(true)
    setEditing(true)
  }

  const handleSave = () => {
    setLoading(true)
    const base = new Firebase()
    base.updateUser(email, canConfig, canManageUsers).then(() => {
      setLoading(false)
      setEdit(false)
      setEditing(false)
    })
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td className="tc">
        {edit ? (
          <InputGroup.Checkbox
            checked={canConfig}
            onChange={() => setcanConfig(!canConfig)}
          />
        ) : (
          <BooleanIcon checked={canConfig} />
        )}
      </td>
      <td className="tc">
        {edit ? (
          <InputGroup.Checkbox
            checked={canManageUsers}
            onChange={() => {
              if (!canManageUsers) setcanConfig(true)
              setcanManageUsers(!canManageUsers)
            }}
          />
        ) : (
          <BooleanIcon checked={canManageUsers} />
        )}
      </td>

      <td>
        {edit ? (
          <Button
            variant="success"
            size="sm"
            isLoading={loading}
            onClick={handleSave}>
            <CheckIcon />
          </Button>
        ) : (
          <Button
            disabled={disabled}
            variant="secondary"
            size="sm"
            onClick={handleEdit}>
            <EditIcon />
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
