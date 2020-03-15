import React, { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import { History } from 'history'

import { sayHello, saveCSV } from '../../utils/api'
import Container from '../../components/Container'

interface Props {
  history: History
}

const Upload: FC<Props> = ({ history }) => {
  const [file, setFile] = useState<any>(null)

  const handleUpload = () => {
    const formData = new FormData()
    formData.append('file', file)

    saveCSV(formData)
      .then(console.log)
      .catch(console.log)
  }

  const onChangeHandler = (event: any) => {
    setFile(event?.target?.files?.[0])
  }

  return (
    <Container page="upload" history={history}>
      <h1>Upload</h1>
      <Button onClick={handleUpload}>Upload</Button>
      <input type="file" name="file" onChange={onChangeHandler} />
    </Container>
  )
}

export default Upload
