const express = require('express')
const path = require('path')
const QRcode = require('qrcode')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/qrrequest', (req, res) => {
  console.log(res.json(req))
})

app.get('/sample', (req, res) => {
  QRcode.toDataURL('http://www.google.com', {}, (err, url) => {
    if (err) throw console.error(err)
    res.json({qr: url})
  })
})

app.listen('3000', () => {
  console.log('Listening on 3000.')
})
