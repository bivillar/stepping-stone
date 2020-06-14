import React, { FC } from 'react'
import {
  Button as BootstrapButton,
  Spinner,
  ButtonProps,
} from 'react-bootstrap'

const Button: FC<Props> = ({
  isLoading = false,
  showText = false,
  children,
  onClick,
  ...rest
}) => {
  return (
    <BootstrapButton {...(onClick && { onClick })} {...rest}>
      {isLoading ? (
        <Spinner animation="border" role="status" size="sm">
          {showText && <span className="sr-only">Loading...</span>}
        </Spinner>
      ) : (
        children
      )}
    </BootstrapButton>
  )
}
interface Props extends ButtonProps {
  isLoading?: boolean
  showText?: boolean
  onClick?: () => void
}

export default Button
