const router = require('express').Router()

const {
  createDivision4,
  getDivisions4,
  getDivision4ById,
  updateDivision4,
  deleteDivision4
} = require('../controllers/division4.controller')

router
  .post('/', createDivision4)
  .get('/', getDivisions4)
  .get('/:id', getDivision4ById)
  .patch('/:id', updateDivision4)
  .delete('/:id', deleteDivision4)

module.exports = router