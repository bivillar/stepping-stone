import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { History } from 'history'

import app from '../../base'
import { sayHello } from '../../utils/api'

interface Props {
  history: History
}

const Home: FC<Props> = ({ history }) => {
  return (
    <>
      <h1>HOME</h1>
      <Button onClick={() => history.push('/upload')}>Go to upload</Button>
    </>
  )
}

export default Home
