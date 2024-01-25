const Country = require('../models/country.model')
const Division1 = require('../models/division1.model')

const createDivision1 = async (req, res) => {
  try {
    const { features } = req.body
    let newDivision1
    
    features.forEach(async (feature) => {
      const { properties, geometry, id } = feature

      // Search the country by ID_1
      const country = await Country.findOne({ geojsonId: properties.ID_0 })

      if (!country) {
        return res.status(404).json({
          success: false,
          message: 'Country not found'
        })
      }

      let coordinates
      if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates;
      if (geometry.type === 'Polygon') coordinates = [geometry.coordinates];

      newDivision1 = await Division1.create({
        country: country._id,
        name: properties.name,
        type: properties.type,
        geojsonId: id,
        geometry: coordinates
      })
    })

    return res.status(201).json({
      success: true,
      message: 'Division1 created successfully',
      result: newDivision1
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating division1',
      description: error.message
    })
  }
}

const getAllDivision1 = async (req, res) => {
  try {
    const divisions = await Division1.find()

    return res.status(200).json({
      success: true,
      message: 'All division1 fetched successfully',
      result: divisions
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching all division1',
      description: error.message
    })
  }
}

const getDivision1ById = async (req, res) => {
  try {
    const division1 = await Division1.findById(req.params.id)

    if (!division1) {
      return res.status(404).json({
          success: false,
          message: 'Division1 not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Division1 fetched successfully',
      result: division1
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching division1',
      description: error.message
    })
  }
}

const updateDivision1 = async (req, res) => {
  try {
    const updatedDivision1 = await Division1.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true }
    )

    if (!updatedDivision1) {
      return res.status(404).json({
        success: false,
        message: 'Division1 not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Division1 updated successfully',
      result: updatedDivision1
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating division1',
      description: error.message
    })
  }
}

const deleteDivision1 = async (req, res) => {
  try {
    const deletedDivision1 = await Division1.findByIdAndDelete(req.params.id)

    if (!deletedDivision1) {
      return res.status(404).json({
        success: false,
        message: 'Division1 not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Division1 deleted successfully',
      result: deletedDivision1
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting division1',
      description: error.message
    })
  }
}

module.exports = {
  createDivision1,
  getAllDivision1,
  getDivision1ById,
  updateDivision1,
  deleteDivision1
}