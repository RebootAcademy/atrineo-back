const router = require('express').Router()

const {
  createData,
  getData,
  getOneData,
  updateData,
  deleteData
} = require('../controllers/data.controller')

router
  .post('/', createData)
  .get('/', getData)
  .get('/:id', getOneData)
  .patch('/:id', updateData)
  .delete('/:id', deleteData)

  module.exports = router