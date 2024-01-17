const State = require('../models/state.model')

const createState = async (req, res) => {
  try {
    const newState = await State.create(req.body)
    res.status(201).json(newState)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getStates = async (req, res) => {
  try {
    const states = await State.find()
    res.status(200).json(states)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id)
    if (!state) {
      res.status(404).json({ message: 'State not found' })
    } else {
      res.status(200).json(state)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateState = async (req, res) => {
  try {
    const updatedState = await State.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedState) {
      res.status(404).json({ message: 'State not found' })
    } else {
      res.status(200).json(updatedState)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteState = async (req, res) => {
  try {
    const deletedState = await State.findByIdAndDelete(req.params.id)
    if (!deletedState) {
      res.status(404).json({ message: 'State not found' })
    } else {
      res.status(200).json({ message: 'State deleted successfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState
}