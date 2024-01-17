const router = require('express').Router()

const {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState
} = require('../controllers/state.controller')

router
  .post('/', createState)
  .get('/', getStates)
  .get('/:id', getStateById)
  .patch('/:id', updateState)
  .delete('/:id', deleteState)

module.exports = router