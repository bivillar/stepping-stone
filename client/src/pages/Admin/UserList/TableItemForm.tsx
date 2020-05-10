import React, { FC, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'

import { Uncheck, Check, Edit } from '../Icons'
import Firebase from '../../../base'

const TableItemForm: FC<Props> = ({ handleAddUser }) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [canUpload, setcanUpload] = useState<boolean>(false)
  const [canManageUsers, setcanManageUsers] = useState<boolean>(false)

  const handleSave = () => {
    Firebase.addUser(name, canUpload, canManageUsers, email).then(() => {
      handleAddUser({
        name,
        canUpload,
        canManageUsers,
        email,
        isAdmin: canUpload && canManageUsers,
      })
    })
  }

  return (
    <tr>
      <td>
        <Form.Control
          required
          placeholder="name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
      </td>
      <td>
        <Form.Control
          required
          placeholder="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </td>
      <td className="tc">
        <InputGroup.Checkbox
          checked={canUpload}
          onChange={() => setcanUpload(!canUpload)}
        />
      </td>
      <td className="tc">
        <InputGroup.Checkbox
          checked={canManageUsers}
          onChange={() => setcanManageUsers(!canManageUsers)}
        />
      </td>
      <td>
        <Button variant="success" size="sm" onClick={handleSave}>
          <Check />
        </Button>
      </td>
    </tr>
  )
}

interface Props {
  handleAddUser: (user: User) => void
}

export default TableItemForm
