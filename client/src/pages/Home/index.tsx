import React, { FC } from 'react'
import { History } from 'history'

import Title from './Title'

interface Props {
  history: History
}

const Home: FC<Props> = ({ history }) => {
  return (
    <>
      <Title />
      <Title />
    </>
  )
}

export default Home
