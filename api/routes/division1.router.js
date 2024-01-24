const router = require('express').Router()

const { 
  isAuth,
  isWizard
} = require('../middlewares')

const {
  createDivision1,
  getAllDivision1,
  getDivision1ById,
  updateDivision1,
  deleteDivision1
} = require('../controllers/division1.controller')

router
  .post('/', isAuth, isWizard, createDivision1)
  .get('/', getAllDivision1)
  .get('/:id', getDivision1ById)
  .patch('/:id', isAuth, isWizard, updateDivision1)
  .delete('/:id', isAuth, isWizard, deleteDivision1)

module.exports = router