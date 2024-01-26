const Division2 = require('../models/division2.model')
const Division1 = require('../models/division1.model')

const createDivision2 = async (req, res) => {
  try {
    const { features } = req.body
    let newDivision2

    features.forEach( async (feature) => {
      const { properties, geometry } = feature

      // Search the division1 by ID_1
      const division1 = await Division1.findOne({ geojsonId: properties.ID_1 })
      
      if (!division1) {
        return res.status(404).json({
          success: false,
          message: 'Divison1 not found'
        })
      }
      
      let coordinates
      if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates;
      if (geometry.type === 'Polygon') coordinates = [ geometry.coordinates ];
      
      newDivision2 = await Division2.create({
        upperDivision: division1._id,
        name: properties.NAME_2,
        type: properties.ENGTYPE_2,
        geojsonId: properties.ID_2,
        geometry: coordinates,
      })
    })
    
    return res.status(201).json({
      success: true,
      message: 'Division2 created successfully',
      result: newDivision2
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating division2',
      description: error.message
    })
  }
}

const createOneDivision2 = async (req, res) => {
  try {
    const { properties, geometry } = req.body

    const division1 = await Division1.findOne({ geojsonId: properties.ID_1 })

    if (!division1) {
      return res.status(404).json({
        success: false,
        message: 'Division1 not found'
      })
    }

    let coordinates
    if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates
    if (geometry.type === 'Polygon') coordinates = [geometry.coordinates]

    const newDivision2 = await Division2.create({
      upperDivision: division1._id,
      name: properties.NAME_2,
      type: properties.ENGTYPE_2,
      geojsonId: properties.ID_2,
      geometry: coordinates,
    })

    return res.status(201).json({
      success: true,
      message: 'Division2 created successfully',
      result: newDivision2
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating division2',
      description: error.message
    })
  }
}

const getAllDivision2 = async (req, res) => {
  try {
    const divisions = await Division2.find()
    return res.status(200).json({
      success: true,
      message: 'All division2 fetched successfully',
      result: divisions
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching all division2',
      description: error.message
    })
  }
}

const getDivision2ById = async (req, res) => {
  try {
    const division2 = await Division2.findById(req.params.id)
    if (!division2) {
      return res.status(404).json({
          success: false,
          message: 'Division2 not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Division2 fetched successfully',
      result: division2
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateDivision2 = async (req, res) => {
  try {
    const updatedDivision2 = await Division2.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedDivision2) {
      return res.status(404).json({
          success: false,
          message: 'Division2 not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Division2 updated successfully',
      result: updatedDivision2
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating division2',
      description: error.message
    })
  }
}

const deleteDivision2 = async (req, res) => {
  try {
    const deletedDivision2 = await Division2.findByIdAndDelete(req.params.id)
    if (!deletedDivision2) {
      return res.status(404).json({
          success: false,
          message: 'Division2 not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Division2 deleted successfully',
      result: deletedDivision2
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting division2',
      description: error.message
    })  
  }
}

module.exports = {
  createDivision2,
  createOneDivision2,
  getAllDivision2,
  getDivision2ById,
  updateDivision2,
  deleteDivision2
}

