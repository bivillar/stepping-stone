import React, { FC } from 'react'
import { History } from 'history'

import Container from '../../components/Container'
import Image from '../../static/images/stepping-stone.png'
import LandingPage from '../../components/LandingPage'

interface Props {
  history: History
}

const Home: FC<Props> = ({ history }) => {
  return (
    <Container page="home" history={history} fillPage>
      {/* <LandingPage /> */}
    </Container>
  )
}

export default Home
