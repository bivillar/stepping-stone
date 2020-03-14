import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { sayHello } from '../../utils/api'
import app from '../../base'

interface Props {}

const Upload: FC<Props> = () => {
  const handleButtonClick = () => {
    sayHello()
      .then(console.log)
      .catch(console.log)
  }
  return (
    <>
      <h1>Upload</h1>
      <Button onClick={() => app.auth().signOut()}>Sign out</Button>
      <Button onClick={handleButtonClick}>Upload</Button>
    </>
  )
}

export default Upload
