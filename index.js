const express = require('express')
const path = require('path')
const QRcode = require('qrcode')
const bodyParser = require('body-parser')
const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost:5432/qrcodes'
})
const dbgateway = require('./dbgateway')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.post('/generate', (req, res) => {
  const qrCode = req.body

  QRcode.toDataURL(qrCode.url, {scale: 25}, (err, url) => {
    if (err) throw console.error(err)

    qrCode.qr = url
    dbgateway.add(qrCode)
      .then((data) => res.json(data))
      .catch((err) => console.log(err))
  })
})

app.put('/qrcards/:id', (req, res) => {
  const qrCode = req.body
  const qrCodeID = req.params.id

  QRcode.toDataURL(qrCode.url, {scale: 25}, (err, url) => {
    if (err) throw console.error(err)

    qrCode.qr = url

    dbgateway.update(qrCode, qrCodeID)
      .then((data) => res.json(data))
      .catch((err) => console.log(err))
  })
})

app.get('/qrcards', (req, res) => {
  dbgateway.readQRTable()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({error: 'Error in creating QR card.'}))
})

app.delete('/qrcards/:id', (req, res) => {
  const qrCodeID = req.params.id

  dbgateway.delete(qrCodeID)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err))
})

app.listen('3000', () => {
  console.log('Listening on 3000.')
})
