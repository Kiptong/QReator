
const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost:5432/qrcodes'
})

const createQRCode = (qrCode) => {
  const query = knex
    .insert(qrCode)
    .into('qrcodes')
    .returning('*')

  return query
}

module.exports = createQRCode
