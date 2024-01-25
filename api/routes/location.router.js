const router = require('express').Router()

const { 
  isAuth,
  isWizard
} = require('../middlewares')

const {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} = require('../controllers/location.controller')

router
  .post('/', isAuth, isWizard, createLocation)
  .get('/', getAllLocations)
  .get('/:id', getLocationById)
  .patch('/:id', isAuth, isWizard, updateLocation)
  .delete('/:id', isAuth, isWizard, deleteLocation)

module.exports = router