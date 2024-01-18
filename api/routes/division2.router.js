const router = require('express').Router()

const {
  createDivision2,
  getDivisions2,
  getDivision2ById,
  updateDivision2,
  deleteDivision2
} = require('../controllers/division2.controller')

router
  .post('/', createDivision2)
  .get('/', getDivisions2)
  .get('/:id', getDivision2ById)
  .patch('/:id', updateDivision2)
  .delete('/:id', deleteDivision2)

module.exports = router