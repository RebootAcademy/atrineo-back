const router = require('express').Router()

const {
  createData,
  createOneData,
  getAllData,
  getDataById,
  updateData,
  deleteData
} = require('../controllers/data.controller')

router
  .post('/', createOneData)
  .post('/:collectionId', createData)
  .get('/', getAllData)
  .get('/:id', getDataById)
  .patch('/:id', updateData)
  .delete('/:id', deleteData)

module.exports = router