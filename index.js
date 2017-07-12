const express = require('express')
const path = require('path')
const QRcode = require('qrcode')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.post('/qrrequest', (req, res) => {
  QRcode.toDataURL(req.body.url, {}, (err, url) => {
    if (err) throw console.error(err)
    res.json({qr: url})
  })
})

app.listen('3000', () => {
  console.log('Listening on 3000.')
})
