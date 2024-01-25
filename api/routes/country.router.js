const router = require('express').Router()

const {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry
} = require('../controllers/country.controller')

router
  .post('/', createCountry)
  .get('/', getAllCountries)
  .get('/:id', getCountryById)
  .patch('/:id', updateCountry)
  .delete('/:id', deleteCountry)

module.exports = router