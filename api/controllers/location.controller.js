const Location = require('../models/location.model')

const createLocation = async (locations) => {
  try {
    locations.forEach(async (location) => {
      const newLocation = new Location({
        division3: location.division3Id,
        division2: location.division2Id,
        division1: location.division1Id,
        country: location.countryId,
      })
      await newLocation.save();
    })

  } catch (error) {
    console.error('Error adding location to the database: ', error)
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