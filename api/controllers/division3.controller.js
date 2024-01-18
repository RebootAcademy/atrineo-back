const Division3 = require('../models/division3.model')
const Division2 = require('../models/division2.model')
const { createLocation } = require('./location.controller')

const createDivision3 = async (req, res) => {
  try {
    const { features } = req.body

    features.forEach(async (feature) => {
      const { properties, geometry } = feature

      // Search the division by ID_1
      const division2 = await Division2.findOne({ geojsonId: properties.ID_2 })
        .populate({
          path: 'country',
          match: { geojsonId: properties.ID_0 }, // Ensure the country's geojsonId matches properties.ID_0
        })
        .exec()

      if (!division2) {
        res.status(500).json({
          message: 'Error adding division3 to the database, division2, division1 or country does not exist',
          error: error.message,
        })
      }

      let coordinates
      if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates;
      if (geometry.type === 'Polygon') coordinates = [geometry.coordinates];

      const newDivision3 = new Division3({
        division2: division2._id,
        name: properties.NAME_3,
        type: properties.ENGTYPE_3,
        geojsonId: properties.ID_3,
        geometry: coordinates,
      })

      await newDivision3.save()
      await createLocation(division2.country._id, division2._id, newDivision3._id);

    })
    res.status(201).json({
      message: 'Division3 added to the database successfully.',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding division3 to the database',
      error: error.message,
    })
  }
}

const getAllDivision3 = async (req, res) => {
  try {
    const divisions = await Division3.find()
    res.status(200).json(divisions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getDivision3ById = async (req, res) => {
  try {
    const division = await Division3.findById(req.params.id)
    if (!division) {
      res.status(404).json({ message: 'Division not found' })
    } else {
      res.status(200).json(division)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateDivision3 = async (req, res) => {
  try {
    const updatedDivision = await Division3.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedDivision) {
      res.status(404).json({ message: 'Division not found' })
    } else {
      res.status(200).json(updatedDivision)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteDivision3 = async (req, res) => {
  try {
    const deletedDivision = await Division3.findByIdAndDelete(req.params.id)
    if (!deletedDivision) {
      res.status(404).json({ message: 'Division not found' })
    } else {
      res.status(200).json({ message: 'Division deleted successfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createDivision3,
  getAllDivision3,
  getDivision3ById,
  updateDivision3,
  deleteDivision3,
}