const router = require('express').Router()

const {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} = require('../controllers/location.controller')

router
  .post('/', createLocation)
  .get('/', getLocations)
  .get('/:id', getLocationById)
  .patch('/:id', updateLocation)
  .delete('/:id', deleteLocation)

  module.exports = router