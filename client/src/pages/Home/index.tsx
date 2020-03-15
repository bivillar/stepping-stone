import React, { FC } from 'react'
import { History } from 'history'

import Container from '../../components/Container'

interface Props {
  history: History
}

const Home: FC<Props> = ({ history }) => {
  return (
    <Container page="home" history={history}>
      <h1>HOME</h1>
    </Container>
  )
}

export default Home
