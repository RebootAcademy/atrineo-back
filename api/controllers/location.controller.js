const Location = require('../models/location.model')
const Country = require('../models/country.model')
const Division1 = require('../models/division1.model')
const Division2 = require('../models/division1.model')
const Division3 = require('../models/division1.model')

const createLocation = async (res) => {
  try {

    const { id } = req.body

    const country = await Country.findOne({ geojsonId: 86 })
    const division1 = await Division1.findOne()
    const division2 = await Division2.findOne()
    const division3 = await Division3.findOne()

    const newLocation = new Location({
      country: country._id,
      division1: division1._id,
      division2: division2._id,
      division3: division3._id,
    });

    await newLocation.save();

/*     console.log({ 
      message: 'Location added to the database successfully.'
    }) */

  } catch (error) {
    res.status(500).json({
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