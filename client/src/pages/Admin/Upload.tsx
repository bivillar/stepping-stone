import React, { FC, useState, useEffect, useContext } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import { History } from 'history'

import { saveCSV } from '../../utils/api'
import Firebase from '../../base'

interface Props {
  history: History
}

const Upload: FC<Props> = ({ history }) => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)

  const handleUpload = (event: any) => {
    event.preventDefault()
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    saveCSV(formData, setProgress)
      .then(result => {
        if (result.status == 200) setProgress(100)
      })
      .catch(() => setError(true))
  }

  const handleFileChange = (event: any) => {
    setFile(event?.target?.files?.[0])
    console.log(event?.target?.files?.[0].name)
  }

  return (
    <div className="adminContainer">
      <h1>Adicione um arquivo do tipo .csv para atualizar os dados</h1>
      <div className="relative mb4">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          onChange={handleFileChange}
        />
        <label className="custom-file-label" htmlFor="customFile">
          {file && file.name}
        </label>
        <div className="mb4 mt4">
          <ProgressBar now={progress} striped />
        </div>
        <Button disabled={!file} block onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </div>
  )
}

export default Upload
