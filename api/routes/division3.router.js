const router = require('express').Router()

const { 
  isAuth,
  isWizard
} = require('../middlewares')

const {
  createDivision3,
  createOneDivision3,
  getAllDivision3,
  getDivision3ById,
  updateDivision3,
  deleteDivision3
} = require('../controllers/division3.controller')

router
  .post('/', isAuth, isWizard, createDivision3)
  .post('/', isAuth, isWizard, createOneDivision3)
  .get('/', getAllDivision3)
  .get('/:id', getDivision3ById)
  .patch('/:id', isAuth, isWizard, updateDivision3)
  .delete('/:id', isAuth, isWizard, deleteDivision3)

module.exports = router