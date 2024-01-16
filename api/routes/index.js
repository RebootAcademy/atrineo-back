const router = require('express').Router()

const { 
  isAuth,
  isAdmin,
  isWizard
} = require('../middlewares/index.js');

const userRouter = require('./user.router.js'); 
const organizationRouter = require('./organization.router.js'); 
const authRouter = require('./auth.router.js'); 

router.use('/users', userRouter)
router.use('/organizations', organizationRouter)
router.use('/auth', authRouter)

module.exports = router