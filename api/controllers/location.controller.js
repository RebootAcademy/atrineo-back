const Location = require('../models/location.model')

const createLocation = async (countryId, division1Id, division2Id, division3Id) => {
  try {
    const newLocation = new Location({
      country: countryId,
      division1: division1Id,
      division2: division2Id,
      division3: division3Id
    });

    await newLocation.save();

    console.log({ 
      message: 'Location added to the database successfully.'
    });
  } catch (error) {
    console.error({
      message: 'Error adding location to the database',
      error: error.message,
    })
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