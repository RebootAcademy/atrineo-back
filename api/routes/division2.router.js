const router = require('express').Router()

const { 
  isAuth,
  isWizard
} = require('../middlewares')

const {
  createDivision2,
  createOneDivision2,
  getAllDivision2,
  getDivision2ById,
  updateDivision2,
  deleteDivision2
} = require('../controllers/division2.controller')

router
  .post('/', isAuth, isWizard, createDivision2)
  .post('/one', isAuth, isWizard, createOneDivision2)
  .get('/', getAllDivision2)
  .get('/:id', getDivision2ById)
  .patch('/:id', isAuth, isWizard, updateDivision2)
  .delete('/:id', isAuth, isWizard, deleteDivision2)

module.exports = router