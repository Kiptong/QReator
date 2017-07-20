const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost:5432/qrcodes'
})

const add = (qrCode) => {
  const query = knex
    .insert(qrCode)
    .into('qrcodes')
    .returning('*')

  return query
}

const update = (qrCode, qrCodeID) => {
  const query = knex('qrcodes')
    .where('id', '=', qrCodeID)
    .update(qrCode)
    .returning('*')

  return query
}

const readQRTable = () => {
  const cardQuery = knex.select().table('qrcodes')

  return cardQuery
}

const deleteQR = (qrID) => {
  const query = knex('qrcodes')
    .where('id', '=', qrID)
    .del()

  return query
}

module.exports = {
  add: add,
  update: update,
  readQRTable: readQRTable,
  delete: deleteQR
}
