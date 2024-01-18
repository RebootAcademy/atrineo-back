const router = require('express').Router()

const { 
  isAuth,
  isWizard
} = require('../middlewares')

const {
  createCollection,
  getCollections,
  getCollection,
  updateCollection,
  deleteCollection
} = require('../controllers/collection.controller')

router
  .post('/', isAuth, isWizard, createCollection)
  .get('/', getCollections)
  .get('/:id', getCollection)
  .patch('/:id', isAuth, isWizard, updateCollection)
  .delete('/:id', isAuth, isWizard, deleteCollection)

module.exports = router