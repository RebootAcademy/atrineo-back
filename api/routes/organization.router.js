const router = require('express').Router()

const { 
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization
} = require('../controllers/organization.controller')


router.post('/', createOrganization)

router.get('/', getOrganizations)
router.get('/:id', getOrganization)

router.patch('/:id', updateOrganization)

router.delete('/:id', deleteOrganization)

module.exports = router