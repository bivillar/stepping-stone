import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { sayHello } from '../../utils/api'

import { History } from 'history'
import Container from '../../components/Container'

interface Props {
  history: History
}

const Upload: FC<Props> = ({ history }) => {
  const handleButtonClick = () => {
    sayHello()
      .then(console.log)
      .catch(console.log)
  }
  return (
    <Container page="upload" history={history}>
      <h1>Upload</h1>
      <Button onClick={handleButtonClick}>Upload</Button>
    </Container>
  )
}

export default Upload
