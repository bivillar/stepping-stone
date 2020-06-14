import React, { FC, useState } from 'react'
import { Form } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import { BsCheck as CheckIcon } from 'react-icons/bs'

import Firebase from '../../utils/firebase/base'
import Button from '../Button'

const TableItemForm: FC<Props> = ({ handleAddUser }) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [canConfig, setcanConfig] = useState<boolean>(false)
  const [canManageUsers, setcanManageUsers] = useState<boolean>(false)

  const handleSave = () => {
    const base = new Firebase()
    base.addUser(name, canConfig, canManageUsers, email).then(() => {
      handleAddUser({
        name,
        canConfig,
        canManageUsers,
        email,
        isAdmin: canConfig && canManageUsers,
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
          checked={canConfig}
          onChange={() => setcanConfig(!canConfig)}
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
          <CheckIcon />
        </Button>
      </td>
    </tr>
  )
}

interface Props {
  handleAddUser: (user: User) => void
}

export default TableItemForm
