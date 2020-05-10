import React, { FC, useState } from 'react'
import { Uncheck, Check, Edit } from '../Icons'
import { Button } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'

const TableItem: FC<Props> = ({
  user: { email, name, upload: userUpload, manageUsers: userManageUser },
  setEditing,
  disabled,
}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [upload, setUpload] = useState<boolean>(userUpload)
  const [manageUsers, setManageUsers] = useState<boolean>(userManageUser)

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
    setEdit(false)
    setEditing(false)
  }

  return (
    <tr key={email}>
      <td>{name}</td>
      <td>{email}</td>
      <td className="tc">
        {edit ? (
          <InputGroup.Checkbox
            checked={upload}
            onChange={() => setUpload(!upload)}
          />
        ) : (
          mark(upload)
        )}
      </td>
      <td className="tc">
        {edit ? (
          <InputGroup.Checkbox
            checked={manageUsers}
            onChange={() => setManageUsers(!manageUsers)}
          />
        ) : (
          mark(manageUsers)
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
