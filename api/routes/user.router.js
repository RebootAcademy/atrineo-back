const router = require('express').Router()

const { 
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller')

router
  .post('/:organization?', createUser)
  .get('/', getUsers)
  .get('/:id', getUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)

module.exports = router