const router = require('express').Router()

const { 
  isAuth,
  isWizard
} = require('../middlewares')

const userRouter = require('./user.router.js'); 
const organizationRouter = require('./organization.router.js'); 
const locationRouter = require('./location.router.js')
const countryRouter = require('./country.router.js')
const division1Router = require('./division1.router.js')
const division2Router = require('./division2.router.js')
const division3Router = require('./division3.router.js')
// const division4Router = require('./division4.router.js')
const authRouter = require('./auth.router.js')
const dataRouter = require('./data.router.js')
const collectionRouter = require('./collection.router.js')

router.use('/users', isAuth, userRouter)
router.use('/organizations', isAuth, isWizard, organizationRouter)
router.use('/location', /* isAuth, isWizard, */ locationRouter)
router.use('/country', countryRouter)
router.use('/division1', division1Router)
router.use('/division2', division2Router)
router.use('/division3', division3Router)
// router.use('/division4', division4Router)
router.use('/auth', authRouter)
router.use('/data', /* isAuth, isWizard, */ dataRouter)
router.use('/collection', collectionRouter)

module.exports = router