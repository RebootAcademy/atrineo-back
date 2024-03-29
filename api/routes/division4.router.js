const router = require('express').Router()

const { 
  isAuth,
  isWizard
} = require('../middlewares')

const {
  createDivision4,
  createOneDivision4,
  getAllDivision4,
  getDivision4ById,
  updateDivision4,
  deleteDivision4,
  addCoordinates
} = require('../controllers/division4.controller')

router
  .post('/', createDivision4)
  .post('/one', isAuth, isWizard, createOneDivision4)
  .get('/', getAllDivision4)
  .get('/:id', getDivision4ById)
  .patch('/coord', addCoordinates)
  .patch('/:id', isAuth, isWizard, updateDivision4)
  .delete('/:id', isAuth, isWizard, deleteDivision4)

module.exports = router