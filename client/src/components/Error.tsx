import React, { FC } from 'react'
import Container from './Container'
import { Button } from 'react-bootstrap'

const Error: FC = ({}) => {
  return (
    <Container>
      <div className="flex flex-column items-center justify-center w-100 h-100">
        <div className="mb2">Algo deu Errado!</div>
        <div className="mb3">Por favor, recarregue a página.</div>
        <Button onClick={() => window.location.reload()}>Recarregar</Button>
      </div>
    </Container>
  )
}

export default Error
