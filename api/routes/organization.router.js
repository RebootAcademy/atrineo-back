const router = require('express').Router()

const { 
  isWizard
} = require('../middlewares')

const { 
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization
} = require('../controllers/organization.controller')

router
  .post('/', isWizard, createOrganization)
  .get('/', isWizard, getOrganizations)
  .get('/:id', isWizard, getOrganization)
  .patch('/:id', isWizard, updateOrganization)
  .delete('/:id', isWizard, deleteOrganization)

module.exports = router