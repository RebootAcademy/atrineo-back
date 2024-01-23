const router = require('express').Router()

const {
  createDivision3,
  getAllDivision3,
  getDivision3ById,
  updateDivision3,
  deleteDivision3
} = require('../controllers/division3.controller')

router
  .post('/', createDivision3)
  .get('/', getAllDivision3)
  .get('/:id', getDivision3ById)
  .patch('/:id', updateDivision3)
  .delete('/:id', deleteDivision3)

module.exports = router