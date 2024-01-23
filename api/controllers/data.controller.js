const Data = require('../models/data.model')
const { transformData } = require('../utils/transformData')

// CREATE/POST - create a new data
const createData = async (req, res) => {
  try {
    const newDataArray = []

    req.body.forEach(async element => {
      element.geometry = transformData(element.geometry)
      const newData = await Data.create({
        ...element,
        locationId: null
      })
      newDataArray.push(newData)
    })

    return res.status(201).json({
      success: true,
      message: 'Data created successfully',
      datas: newDataArray
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error creating data',
      description: error.message,
    })
  }
}

// READ/GET - get all datas
const getData = async (req, res) => {
  try {
    const datas = await Data.find()

    return res.status(200).json({
      success: true,
      message: 'Fetching Datas OK',
      datas,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching datas',
      description: error.message,
    })
  }
}

// READ/GET - get ONE data by id
const getOneData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id)
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Fetching data OK',
      collection
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching data',
      description: error.message,
    })
  }
}

// UPDATE/PATCH - update ONE data by id
const updateData = async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Data updated successfully',
      data: updatedData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating data',
      description: error.message
    })
  }
}

// DELETE - delete ONE data by id
const deleteData = async (req, res) => {
  try {
    const deletedData = await Data.findByIdAndDelete(req.params.id)

    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Data deleted successfully',
      data: deletedData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting data',
      description: error.message
    })
  }
}

module.exports = {
  createData,
  getData,
  getOneData,
  updateData,
  deleteData
}