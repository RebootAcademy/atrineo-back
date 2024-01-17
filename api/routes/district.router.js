const router = require('express').Router()

const {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict
} = require('../controllers/district.controller')

router
  .post('/', createDistrict)
  .get('/', getDistricts)
  .get('/:id', getDistrictById)
  .patch('/:id', updateDistrict)
  .delete('/:id', deleteDistrict)

module.exports = router