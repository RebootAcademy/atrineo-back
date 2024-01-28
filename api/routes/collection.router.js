const router = require('express').Router()

const { 
  isAuth,
  isWizard
} = require('../middlewares')

const {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getPublicCollections,
  getAllOwnOrganizationCollections,
} = require('../controllers/collection.controller')

router
  .post('/:ownerId', isAuth, isWizard, createCollection)
  .get('/', getAllCollections)
  .get('/public', getPublicCollections)
  .get('/organization', isAuth, isWizard, getAllOwnOrganizationCollections)
  .get('/:id', getCollectionById)
  .patch('/:id', isAuth, isWizard, updateCollection)
  .delete('/:id', isAuth, isWizard, deleteCollection)


module.exports = router