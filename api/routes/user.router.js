const router = require('express').Router()

const { 
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller')


router.post('/:organization?', createUser)

router.get('/', getUsers)
router.get('/:id', getUser)

router.patch('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router