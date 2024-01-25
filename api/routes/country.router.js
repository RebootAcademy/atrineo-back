const router = require('express').Router()

const { 
  isAuth,
  isWizard
} = require('../middlewares')

const {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry
} = require('../controllers/country.controller')

router
  .post('/', isAuth, isWizard, createCountry)
  .get('/', getAllCountries)
  .get('/:id', getCountryById)
  .patch('/:id', isAuth, isWizard, updateCountry)
  .delete('/:id', isAuth, isWizard, deleteCountry)

module.exports = router