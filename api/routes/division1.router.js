const router = require('express').Router()

const {
  createDivision1,
  getAllDivision1,
  getDivision1ById,
  updateDivision1,
  deleteDivision1
} = require('../controllers/division1.controller')

router
  .post('/', createDivision1)
  .get('/', getAllDivision1)
  .get('/:id', getDivision1ById)
  .patch('/:id', updateDivision1)
  .delete('/:id', deleteDivision1)

module.exports = router