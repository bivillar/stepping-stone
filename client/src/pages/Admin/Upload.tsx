import React, { FC, useState } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import { History } from 'history'
import { Alert } from 'react-bootstrap'

import { saveCSV } from '../../utils/api'

interface Props {
  history: History
}

const Upload: FC<Props> = ({ history }) => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  const handleUpload = (event: any) => {
    event.preventDefault()
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    saveCSV(formData, setProgress)
      .then(result => {
        if (result.status === 200) {
          setLoaded(true)
        }
      })
      .catch(() => setError(true))
  }

  const handleFileChange = (event: any) => {
    setProgress(0)
    setLoaded(false)
    setError(false)
    const file = event?.target?.files?.[0]
    if (file) {
      setFile(file)
      console.log(file.name)
    } else setFile(null)
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
        {error && (
          <div className="mt4 tc">
            <Alert variant="danger">Ocorreu um erro ao tentar salvar.</Alert>
          </div>
        )}
        {loaded && (
          <div className="mt4 tc">
            <Alert variant="success">Arquivo salvo com sucesso!</Alert>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload
