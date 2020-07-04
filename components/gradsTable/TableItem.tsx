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
import { Form } from 'react-bootstrap'

const TableItem: FC<Props> = ({ yearData, setEditing, disabled }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [female, setFemale] = useState<number>(yearData.female ?? 0)
  const [male, setMale] = useState<number>(yearData.male ?? 0)

  const handleEdit = () => {
    setEdit(true)
    setEditing(true)
  }

  const handleSave = () => {
    setLoading(true)
    const base = new Firebase()
    const percentage = male ? female / (male + female) : 0
    base
      .updateGradChartYear(yearData.year, female, male, percentage)
      .then(() => {
        setLoading(false)
        setEdit(false)
        setEditing(false)
      })
  }

  return (
    <tr>
      <td>{yearData.year}</td>
      <td className="tc">
        {edit ? (
          <Form.Control
            required
            placeholder="female"
            value={female}
            type="number"
            onChange={(e: any) =>
              setFemale(e.target.value < 0 ? 0 : e.target.value)
            }
          />
        ) : (
          <span>{female}</span>
        )}
      </td>
      <td className="tc">
        {edit ? (
          <Form.Control
            required
            placeholder="male"
            value={male ?? 0}
            type="number"
            onChange={(e: any) =>
              setMale(e.target.value < 0 ? 0 : e.target.value)
            }
          />
        ) : (
          <span>{male}</span>
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
  yearData: ChartData
  setEditing: (isEditin: boolean) => void
  disabled: boolean
}

export default TableItem
