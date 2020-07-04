import React, { FC, useState } from 'react'
import { Form } from 'react-bootstrap'
import { BsCheck as CheckIcon } from 'react-icons/bs'

import Button from '../Button'

const TableItemForm: FC<Props> = ({ handleAddYear }) => {
  const [year, setYear] = useState<number>(1950)
  const [female, setFemale] = useState<number | undefined>(undefined)
  const [male, setMale] = useState<number | undefined>(undefined)

  const handleChange = ({
    e,
    set,
    min,
    max,
  }: {
    e: any
    set: (value: number) => void
    min?: number
    max?: number
  }) => {
    const value = +e.target.value
    if (typeof min !== 'undefined' && value < min) set(min)
    else if (typeof max !== 'undefined' && value > max) set(max)
    else {
      set(value)
    }
  }

  return (
    <tr>
      <td>
        <Form.Control
          required
          placeholder="year"
          type="number"
          value={year}
          onChange={(e: any) =>
            handleChange({ e, set: setYear, max: new Date().getFullYear() })
          }
        />
      </td>
      <td>
        <Form.Control
          required
          value={female}
          type="number"
          onChange={(e: any) => handleChange({ e, set: setFemale, min: 0 })}
        />
      </td>
      <td className="tc">
        <Form.Control
          value={male}
          type="number"
          onChange={(e: any) => handleChange({ e, set: setMale, min: 0 })}
        />
      </td>
      <td>
        <Button
          isLoading={isLoading}
          variant="success"
          size="sm"
          disabled={typeof female === 'undefined'}
          onClick={() => handleAddYear(year.toString(), female!, male)}>
          <CheckIcon />
        </Button>
      </td>
    </tr>
  )
}

interface Props {
  handleAddYear: (year: string, female: number, male?: number) => void
}

export default TableItemForm
