const router = require('express').Router()

const {
  createRegion,
  getRegions,
  getRegionById,
  updateRegion,
  deleteRegion
} = require('../controllers/region.controller')

router
  .post('/', createRegion)
  .get('/', getRegions)
  .get('/:id', getRegionById)
  .patch('/:id', updateRegion)
  .delete('/:id', deleteRegion)

  module.exports = router