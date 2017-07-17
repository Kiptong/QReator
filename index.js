const express = require('express')
const path = require('path')
const QRcode = require('qrcode')
const bodyParser = require('body-parser')
const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost:5432/qrcodes'
})

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.post('/generate', (req, res) => {
  QRcode.toDataURL(req.body.url, {scale: 25}, (err, url) => {
    if (err) throw console.error(err)
    const qrCode = req.body
    qrCode.qr = url
    const query = knex
      .insert(qrCode)
      .into('qrcodes')

    query.then(() => console.log('done!'))
      .catch((err) => console.log(err))

    res.json(qrCode)
  })
})

app.get('/qrcards', (req, res) => {
  const cardQuery = knex.select().table('qrcodes')

  cardQuery
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({error: 'Error in creating QR card.'}))
})

app.listen('3000', () => {
  console.log('Listening on 3000.')
})
