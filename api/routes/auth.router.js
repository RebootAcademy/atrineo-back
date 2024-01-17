const router = require('express').Router()

const { isAuth } = require('../middlewares')

const { 
  signup,
  login
} = require('../controllers/auth.controller')


/* router.post('/signup/:organization?', signup) */
router.post('/login', login)


module.exports = router