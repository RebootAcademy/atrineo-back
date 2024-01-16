const router = require('express').Router()

const { 
  isAuth,
  isAdmin,
  isWizard
} = require('../middlewares/index.js');

const userRouter = require('./user.router.js'); 
const organizationRouter = require('./user.router.js'); 

router.use('/users', userRouter)
router.use('/organizations', organizationRouter)

module.exports = router