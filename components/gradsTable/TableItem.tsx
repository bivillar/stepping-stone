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

const TableItem: FC<Props> = ({
  yearData,
  setEditing,
  disabled,
  deleteYear,
  updateYears,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [female, setFemale] = useState<number>(yearData.female)
  const [male, setMale] = useState<number | undefined>(yearData.male)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  const handleEdit = () => {
    setEdit(true)
    setEditing(true)
  }

  const handleSave = () => {
    setLoading(true)
    const base = new Firebase()
    const percentage = male ? (female * 100) / (male + female) : 0
    base
      .updateGradChartYear(yearData.year, female, male, percentage)
      .then(() => {
        updateYears({ year: yearData.year, female, male, percentage })
        setLoading(false)
        setEdit(false)
        setEditing(false)
      })
  }

  const handleDelete = () => {
    setDeleteLoading(true)
    const base = new Firebase()
    base.removeYear(yearData.year).then(() => deleteYear())
  }

  const handleChange = (
    e: any,
    set: (value: number) => void,
    min?: number,
    max?: number
  ) => {
    const value = +e.target.value
    if (min && value < min) set(min)
    if (max && value > max) set(max)
    set(value)
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
            onChange={(e: any) => handleChange(e, setFemale, 0)}
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
            value={male}
            type="number"
            onChange={(e: any) => handleChange(e, setMale, 0)}
          />
        ) : (
          <span>{male}</span>
        )}
      </td>

      <td className="flex">
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
        <div className="pl3">
          <Button
            isLoading={deleteLoading}
            disabled={edit || disabled}
            variant="danger"
            size="sm"
            onClick={handleDelete}>
            <XIcon />
          </Button>
        </div>
      </td>
    </tr>
  )
}

interface Props {
  yearData: ChartData
  setEditing: (isEditin: boolean) => void
  disabled: boolean
  deleteYear: () => void
  updateYears: (yearData: any) => void
}

export default TableItem
