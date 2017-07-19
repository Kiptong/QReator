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
  const qrCode = req.body

  QRcode.toDataURL(qrCode.url, {scale: 25}, (err, url) => {
    if (err) throw console.error(err)

    qrCode.qr = url
    const query = knex
      .insert(qrCode)
      .into('qrcodes')

    query.then(() => console.log('done!'))
      .catch((err) => console.log(err))

    res.json(qrCode)
  })
})

app.put('/qrcards/:id', (req, res) => {
  const qrCode = req.body

  QRcode.toDataURL(qrCode.url, {scale: 25}, (err, url) => {
    if (err) throw console.error(err)

    qrCode.qr = url

    const query = knex('qrcodes')
      .where('id', '=', req.params.id)
      .update(qrCode)
      .returning('*')

    query
      .then((data) => res.json(data))
      .catch((err) => console.log(err))
  })
})

app.get('/qrcards', (req, res) => {
  const cardQuery = knex.select().table('qrcodes')

  cardQuery
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({error: 'Error in creating QR card.'}))
})

app.delete('/deleteqr/:id', (req, res) => {
  const query = knex('qrcodes')
    .where('id', '=', req.params.id)
    .del()

  query
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
})

app.listen('3000', () => {
  console.log('Listening on 3000.')
})
