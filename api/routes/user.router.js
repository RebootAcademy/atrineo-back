const router = require('express').Router()

const { 
  isAuth, isAdmin, isWizard
} = require('../middlewares')

const { 
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getOwnProfile,
  createOwnOrganizationUser,
  getAllOwnOrganizationUsers,
  getOwnOrganizationUserById,
  updateOwnOrganizationUser,
  deleteOwnOrganizationUser,
} = require('../controllers/user.controller')

router
  // admin organization routes
  .get('/profile', getOwnProfile)
  .post('/admin', isAdmin, createOwnOrganizationUser)
  .get('/admin', isAdmin, getAllOwnOrganizationUsers)
  .get('/admin/:id', isAdmin, getOwnOrganizationUserById)
  .patch('/admin/:id', isAdmin, updateOwnOrganizationUser)
  .delete('/admin/:id', isAdmin, deleteOwnOrganizationUser)
  // crud for wizard
  .post('/:organizationId', isWizard, createUser)
  .get('/', isWizard, getAllUsers)
  .get('/:id', isWizard, getUserById)
  .patch('/:id', isWizard, updateUser)
  .delete('/:id', isWizard, deleteUser)

module.exports = router