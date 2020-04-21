import React, { FC } from 'react'
import {
  Button as BootstrapButton,
  Spinner,
  ButtonProps,
} from 'react-bootstrap'

interface Props extends ButtonProps {
  isLoading?: boolean
}

const Button: FC<Props> = ({ isLoading = false, children, ...rest }) => {
  return (
    <BootstrapButton {...rest}>
      {isLoading ? (
        <Spinner animation="border" role="status" size="sm">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        children
      )}
    </BootstrapButton>
  )
}

export default Button
