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

app.post('/qrrequest', (req, res) => {
  QRcode.toDataURL(req.body.url, {}, (err, url) => {
    console.log(url)
    if (err) throw console.error(err)
    const qr = {qr: url}
    req.body.qr = url
    const query = knex
      .insert(req.body)
      .into('qrcodes')
    query.then(() => console.log('done!'))
      .catch((err) => console.log(err))
    res.json(qr)
  })
})

app.listen('3000', () => {
  console.log('Listening on 3000.')
})
