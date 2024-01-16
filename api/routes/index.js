const router = require('express').Router()

const { 
  isAuth,
  isAdmin,
  isWizard
} = require('../middlewares/index.js');

const userRouter = require('./user.router.js'); 
const organizationRouter = require('./organization.router.js'); 
const locationRouter = require('./location.router.js')
const countryRouter = require('./country.router.js')
const regionRouter = require('./region.router.js')
const districtRouter = require('./district.router.js')
const authRouter = require('./auth.router.js')

router.use('/users', userRouter)
router.use('/organizations', organizationRouter)
router.use('/location', locationRouter)
router.use('/country', countryRouter)
router.use('/region', regionRouter)
router.use('/district', districtRouter)
router.use('/auth', authRouter)

module.exports = router