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
const division4Router = require('./division4.router.js')
const authRouter = require('./auth.router.js')
const dataRouter = require('./data.router.js')
const collectionRouter = require('./collection.router.js')

router
  .use('/users', isAuth, userRouter)
  .use('/organizations', isAuth, isWizard, organizationRouter)
  .use('/location', /* isAuth, isWizard, */ locationRouter)
  .use('/country', countryRouter)
  .use('/division1', division1Router)
  .use('/division2', division2Router)
  .use('/division3', division3Router)
  .use('/division4', division4Router)
  .use('/auth', authRouter)
  .use('/data', /* isAuth, isWizard, */ dataRouter)
  .use('/collection', collectionRouter)

module.exports = router