const express = require('express')
const csv = require('csv-parser')
const fs = require('fs')
const fileUpload = require('express-fileupload')

const app = express()
app.use(fileUpload())

const port = process.env.PORT || 5000

app.get('/api/mensagem', (req, res) => {
  let rows = []
  fs.createReadStream('files/TCC.csv')
    .pipe(csv())
    .on('data', row => {
      rows.push(row)
    })
    .on('end', () => {
      res.send({ data: rows })
      console.log('CSV file successfully processed')
    })
})

app.post('/api/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  console.log('TO AQUI')
  const file = req.files.file

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
