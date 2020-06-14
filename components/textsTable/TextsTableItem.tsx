import React, { FC, useState, useEffect } from 'react'
import { InputGroup } from 'react-bootstrap'
import BooleanIcon from '../BooleanIcon'

const TextTableItem: FC<Props> = ({
  isEditing,
  onCheck,
  text,
  initialSelected,
  checkDisabled,
}) => {
  const [selected, setSelected] = useState<boolean>(initialSelected)
  const [disabled, setDisabled] = useState<boolean>(checkDisabled)

  useEffect(() => {
    setSelected(initialSelected)
  }, [initialSelected])

  useEffect(() => {
    setDisabled(checkDisabled && !selected)
  }, [checkDisabled, selected])

  const handleCheck = () => {
    setSelected(onCheck(text, selected))
  }

  const { id, value } = text

  return (
    <tr>
      <td>{value}</td>
      <td className="tc">
        {isEditing ? (
          <InputGroup.Checkbox
            checked={selected}
            onChange={() => handleCheck()}
            disabled={disabled}
          />
        ) : (
          <BooleanIcon checked={selected} />
        )}
      </td>
    </tr>
  )
}

interface Props {
  isEditing: boolean
  onCheck: (text: FieldText, selected: boolean) => boolean
  text: FieldText
  initialSelected: boolean
  checkDisabled: boolean
}

export default TextTableItem
