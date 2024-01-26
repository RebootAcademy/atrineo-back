const Division3 = require('../models/division3.model')
const Division2 = require('../models/division2.model')

const createDivision3 = async (req, res) => {
  try {
    const { features } = req.body
    let newDivision3

    if (!features || !Array.isArray(features)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid features data in the request body' 
      })
    }
    
    for (let i = 0; i < features.length; i++) {
      const feature = features[i]
      const { properties, geometry } = feature
      
      const division2 = await Division2.findOne({ geojsonId: properties.ID_2 })
      
      if (!division2) {
        return res.status(404).json({
          success: false,
          message: 'Division2 not found'
        })
      }
      
      let coordinates
      if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates
      if (geometry.type === 'Polygon') coordinates = [geometry.coordinates]
      
      newDivision3 = await Division3.create({
        upperDivision: division2._id,
        name: properties.NAME_3,
        type: properties.ENGTYPE_3,
        geojsonId: properties.ID_3,
        geometry: coordinates,
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Division3 created successfully',
      result: newDivision3
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error adding division3 to the database',
      error: error.message,
    })
  }
}

const createOneDivision3 = async (req, res) => {
  try {
    const { properties, geometry } = req.body

    const division2 = await Division2.findOne({ geojsonId: properties.ID_2 })

    if (!division2) {
      return res.status(404).json({
        success: false,
        message: 'Division2 not found'
      })
    }

    let coordinates
    if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates
    if (geometry.type === 'Polygon') coordinates = [geometry.coordinates]

    const newDivision3 = await Division3.create({
      upperDivision: division2._id,
      name: properties.NAME_3,
      type: properties.ENGTYPE_3,
      geojsonId: properties.ID_3,
      geometry: coordinates,
    })

    return res.status(201).json({
      success: true,
      message: 'Division3 created successfully',
      result: newDivision3
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error adding division3 to the database',
      error: error.message,
    })
  }
}

const getAllDivision3 = async (req, res) => {
  try {
    const divisions = await Division3.find()
    return res.status(200).json({
      success: true,
      message: 'All division3 fetched successfully',
      result: divisions
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching all division3',
      description: error.message
    })  
  }
}

const getDivision3ById = async (req, res) => {
  try {
    const division3 = await Division3.findById(req.params.id)
    if (!division3) {
      return res.status(404).json({
          success: false,
          message: 'Division3 not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Division3 fetched successfully',
      result: division3
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching division3',
      description: error.message
    })  
  }
}

const updateDivision3 = async (req, res) => {
  try {
    const updatedDivision3 = await Division3.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    )
    if (!updatedDivision3) {
      return res.status(404).json({
        success: false,
        message: 'Division3 not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Division3 updated successfully',
      result: updatedDivision3
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating division3',
      description: error.message
    })  
  }
}

const deleteDivision3 = async (req, res) => {
  try {
    const deletedDivision3 = await Division3.findByIdAndDelete(req.params.id)
    if (!deletedDivision3) {
      return res.status(404).json({
        success: false,
        message: 'Division3 not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Division3 deleted successfully',
      result: deletedDivision3
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting division3',
      description: error.message
    })   
  }
}

module.exports = {
  createDivision3,
  createOneDivision3,
  getAllDivision3,
  getDivision3ById,
  updateDivision3,
  deleteDivision3,
}