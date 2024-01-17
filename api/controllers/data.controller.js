const Data = require('../models/data.model')
const { transformData } = require('../utils/transformData')

const createData = async (req, res) => {
  try {
    req.body.forEach(element => {
      element.geometry = transformData(element.geometry)
      const newData = new Data(element)
      newData.save()
    })

    return res.status(201).json(
      { message: 'Data created successfully' },
    )
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getData = async (req, res) => {
  try {
    const data = await Data.find()
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getOneData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id)
    if (!data) {
      return res.status(404).json({ message: 'Data not found' })
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateData = async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedData)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const deleteData = async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Data deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  createData,
  getData,
  getOneData,
  updateData,
  deleteData
}