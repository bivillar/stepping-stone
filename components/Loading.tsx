import React, { FC } from 'react'
import Container from './Container'

const Loading: FC = ({}) => {
  return (
    <Container>
      <ul className="loading w-100 h-100 items-center">
        <li className="loadingDot" />
        <li className="loadingDot" />
        <li className="loadingDot" />
      </ul>
    </Container>
  )
}

export default Loading
