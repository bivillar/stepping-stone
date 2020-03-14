import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import app from '../../base'

interface Props {}

const Home: FC<Props> = () => {
  return (
    <>
      <h1>HOME</h1>
      <Button onClick={() => app.auth().signOut()}>Sign out</Button>
    </>
  )
}

export default Home
