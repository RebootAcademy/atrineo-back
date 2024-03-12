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
  addDataToCollection,
  deleteCollection,
  getPublicCollections,
  getAllOwnOrganizationCollections,
} = require('../controllers/collection.controller')

router
  .post('/:ownerId', isAuth, isWizard, createCollection)
  .get('/', isAuth, isWizard, getAllCollections)
  .get('/public', getPublicCollections)
  .get('/organization', isAuth, getAllOwnOrganizationCollections)
  .get('/:id', isAuth, isWizard, getCollectionById)
  .patch('/:id', isAuth, isWizard, updateCollection)
  .patch('/:id/add', isAuth, isWizard, addDataToCollection)
  .delete('/:id', isAuth, isWizard, deleteCollection)


module.exports = router