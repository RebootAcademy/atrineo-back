const Country = require('../models/country.model')
const Division1 = require('../models/division1.model')

const createDivision1 = async (req, res) => {
  try {
    const { features } = req.body

    features.forEach(async (feature) => {
      const { properties, geometry } = feature

      // Search the country by ID_1
      const country = await Country.findOne({ geojsonId: properties.ID_1 })

      if (!country) {
        res.status(500).json({
          message: 'Error adding division1 to the database, country does not exist',
          error: error.message,
        })
      }

      let coordinates
      if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates;
      if (geometry.type === 'Polygon') coordinates = [geometry.coordinates];

      const newDivision1 = new Division1({
        country: country._id,
        name: properties.NAME_1,
        type: properties.ENGTYPE_1,
        geojsonId: properties.ID_1,
        geometry: coordinates,
      })

      await newDivision1.save()
      await createLocation(country._id, newDivision1._id);
    })

    res.status(201).json({
      message: 'Division1 added to the database successfully.',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding division1 to the database',
      error: error.message,
    })
  }
}

const getAllDivision1 = async (req, res) => {
  try {
    const divisions = await Division1.find()
    res.status(200).json(divisions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getDivision1ById = async (req, res) => {
  try {
    const division1 = await Division1.findById(req.params.id)
    if (!division1) {
      res.status(404).json({ message: 'Division1 not found' })
    } else {
      res.status(200).json(division1)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateDivision1 = async (req, res) => {
  try {
    const updatedDivision1 = await Division1.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedDivision1) {
      res.status(404).json({ message: 'Division1 not found' })
    } else {
      res.status(200).json(updatedDivision1)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteDivision1 = async (req, res) => {
  try {
    const deletedDivision1 = await Division1.findByIdAndDelete(req.params.id)
    if (!deletedDivision1) {
      res.status(404).json({ message: 'Division1 not found' })
    } else {
      res.status(200).json({ message: 'Division1 deleted successfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createDivision1,
  getAllDivision1,
  getDivision1ById,
  updateDivision1,
  deleteDivision1
}