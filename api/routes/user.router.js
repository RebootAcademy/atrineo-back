const router = require('express').Router()

const { 
  isAdmin, isWizard
} = require('../middlewares')

const { 
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createOwnOrganizationUser,
  getOwnOrganizationUsers,
  getOwnOrganizationUser,
  updateOwnOrganizationUser,
  deleteOwnOrganizationUser,
} = require('../controllers/user.controller')

router
  // admin organization routes
  .post('/admin', isAdmin, createOwnOrganizationUser)
  .get('/admin', isAdmin, getOwnOrganizationUsers)
  .get('/admin/:id', isAdmin, getOwnOrganizationUser)
  .patch('/admin/:id', isAdmin, updateOwnOrganizationUser)
  .delete('/admin/:id', isAdmin, deleteOwnOrganizationUser)
  // crud for wizard
  .post('/:organization', isWizard, createUser)
  .get('/', isWizard, getUsers)
  .get('/:id', isWizard, getUser)
  .patch('/:id', isWizard, updateUser)
  .delete('/:id', isWizard, deleteUser)

module.exports = router