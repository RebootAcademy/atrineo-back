const Location = require('../models/location.model')

const createLocation = async (locations) => {
  try {
    const newLocation = await Location.create({
      division4: locations.division4Id,
      division3: locations.division3Id,
      division2: locations.division2Id,
      division1: locations.division1Id,
      country: locations.countryId,
    })

    return res.status(201).json({
    success: true,
    message: 'Location created successfully',
    location: newLocation
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating location',
      description: error.message
    })
  }
}

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find()

    return res.status(200).json({
      success: true,
      message: 'Fetching locations OK',
      locations
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching locations',
      description: error.message
    })
  }
}

const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
    if (!location) {
      return res.status(404).json({ 
        success: false,
        message: 'Location not found' 
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Fetching location OK',
      location
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching location',
      description: error.message
    })
  }
}

const updateLocation = async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedLocation) {
      return res.status(404).json({ 
        success: false,
        message: 'Location not found' 
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Location updated successfully',
      location: updatedLocation
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating location',
      description: error.message
    })
  }
}

const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id)

    if (!deletedLocation) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Location deleted successfully',
      location: deletedLocation
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting location',
      description: error.message
    })
  }
}

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation
}