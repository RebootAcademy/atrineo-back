const router = require('express').Router()

const { 
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization
} = require('../controllers/organization.controller')

router
  .post('/', createOrganization)
  .get('/', getOrganizations)
  .get('/:id', getOrganization)
  .patch('/:id', updateOrganization)
  .delete('/:id', deleteOrganization)

module.exports = router