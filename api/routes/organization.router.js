const router = require('express').Router()

const { 
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
} = require('../controllers/organization.controller')

router
  .post('/', createOrganization)
  .get('/', getAllOrganizations)
  .get('/:id', getOrganizationById)
  .patch('/:id', updateOrganization)
  .delete('/:id', deleteOrganization)

module.exports = router