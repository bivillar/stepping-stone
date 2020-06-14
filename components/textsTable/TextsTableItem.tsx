import React, { FC, useState } from 'react'
import { InputGroup } from 'react-bootstrap'
import BooleanIcon from '../BooleanIcon'

const TextTableItem: FC<Props> = ({
  isEditing,
  onCheck,
  text: { id, value },
  initialSelected,
}) => {
  const [selected, setSelected] = useState<boolean>(initialSelected)

  const handleCheck = () => {
    setSelected(onCheck(id, selected))
  }

  return (
    <tr>
      <td>{value}</td>
      <td className="tc">
        {isEditing ? (
          <InputGroup.Checkbox
            checked={selected}
            onChange={() => handleCheck()}
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
  onCheck: (id: string, selected: boolean) => boolean
  text: Text
  initialSelected: boolean
}

export default TextTableItem
