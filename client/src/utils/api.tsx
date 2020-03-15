import axios from 'axios'

export const sayHello = async () => {
  const response = await fetch('/api/mensagem')
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  return body
}

export const saveCSV = async (formData: FormData) => {
  return axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: ProgressEvent) => {
      console.log(progressEvent.loaded, progressEvent.total)
    },
  })
}
