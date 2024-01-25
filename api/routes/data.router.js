const router = require('express').Router()

const {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData
} = require('../controllers/data.controller')

router
  .post('/:collectionId', createData)
  .get('/', getAllData)
  .get('/:id', getDataById)
  .patch('/:id', updateData)
  .delete('/:id', deleteData)

module.exports = router