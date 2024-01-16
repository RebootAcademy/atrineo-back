const Location = require('../models/location.model')

const createLocation = async (req, res) => {
  try {
    const newLocation = await Location.create(req.body)
    res.status(201).json(newLocation)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find()
    res.status(200).json(locations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
    if (!location) {
      res.status(404).json({ message: 'Location not found' })
    } else {
      res.status(200).json(location)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateLocation = async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedLocation) {
      res.status(404).json({ message: 'Location not found' })
    } else {
      res.status(200).json(updatedLocation)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id)
    if (!deletedLocation) {
      res.status(404).json({ message: 'Location not found' })
    } else {
      res.status(200).json({ message: 'Location deleted succesfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
}