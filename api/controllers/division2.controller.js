const Division2 = require('../models/division2.model')
const Division1 = require('../models/division1.model')

const createDivision2 = async (req, res) => {
  try {
    const { features } = req.body

    features.forEach( async (feature) => {
      const { properties, geometry } = feature

      // Search the division1 by ID_1
      const division1 = await Division1.findOne({ geojsonId: properties.ID_1 })
      
      if (!division1) {
        res.status(500).json({
          message: 'Error adding division2 to the database, division1 or country does not exist',
          error: error.message,
        })
      }
      
      let coordinates
      if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates;
      if (geometry.type === 'Polygon') coordinates = [ geometry.coordinates ];
      
      const newDivision2 = new Division2({
        division1: division1._id,
        name: properties.NAME_2,
        type: properties.ENGTYPE_2,
        geojsonId: properties.ID_2,
        geometry: coordinates,
      })

      await newDivision2.save()
      await createLocation(division1.country._id, division1._id, newDivision2._id);
    })
    
    res.status(201).json({ 
      message: 'Division2 added to the database successfully.',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding division2 to the database',
      error: error.message,
    })
  }
}

const getAllDivision2 = async (req, res) => {
  try {
    const divisions = await Division2.find()
    res.status(200).json(divisions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getDivision2ById = async (req, res) => {
  try {
    const division2 = await Division2.findById(req.params.id)
    if (!division2) {
      res.status(404).json({ message: 'Division2 not found' })
    } else {
      res.status(200).json(division2)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateDivision2 = async (req, res) => {
  try {
    const updatedDivision2 = await Division2.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedDivision2) {
      res.status(404).json({ message: 'Division2 not found' })
    } else {
      res.status(200).json(updatedDivision2)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteDivision2 = async (req, res) => {
  try {
    const deletedDivision2 = await Division2.findByIdAndDelete(req.params.id)
    if (!deletedDivision2) {
      res.status(404).json({ message: 'Division2 not found' })
    } else {
      res.status(200).json({ message: 'Division2 deleted successfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createDivision2,
  getAllDivision2,
  getDivision2ById,
  updateDivision2,
  deleteDivision2
}

