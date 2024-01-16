const router = require('express').Router()

const {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry
} = require('../controllers/country.controller')

router
  .post('/', createCountry)
  .get('/', getCountries)
  .get('/:id', getCountryById)
  .patch('/:id', updateCountry)
  .delete('/:id', deleteCountry)

  module.exports = router