const express = require('express')
const csv = require('csv-parser')
const fs = require('fs')

const app = express()
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

app.listen(port, () => console.log(`Listening on port ${port}`))
