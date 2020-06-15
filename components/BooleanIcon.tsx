import React, { FC } from 'react'
import { BsCheck as CheckIcon, BsX as XIcon } from 'react-icons/bs'

const BooleanIcon: FC<Props> = ({ checked }) =>
  checked ? (
    <span className="c-success" style={{ fontSize: 25 }}>
      <CheckIcon />
    </span>
  ) : (
    <span className="c-danger" style={{ fontSize: 25 }}>
      <XIcon />
    </span>
  )

interface Props {
  checked?: boolean
}

export default BooleanIcon
