const router = require('express').Router()

const {
  createDivision3,
  getDivisions3,
  getDivision3ById,
  updateDivision3,
  deleteDivision3
} = require('../controllers/division3.controller')

router
  .post('/', createDivision3)
  .get('/', getDivisions3)
  .get('/:id', getDivision3ById)
  .patch('/:id', updateDivision3)
  .delete('/:id', deleteDivision3)

module.exports = router