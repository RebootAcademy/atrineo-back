const District = require('../models/district.model')

const createDistrict = async (req, res) => {
  try {
    const newDistrict = await District.create(req.body)
    res.status(201).json(newDistrict)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getDistricts = async (req, res) => {
  try {
    const districts = await District.find()
    res.status(200).json(districts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getDistrictById = async (req, res) => {
  try {
    const district = await District.findById(req.params.id)
    if (!district) {
      res.status(404).json({ message: 'District not found' })
    } else {
      res.status(200).json(district)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateDistrict = async (req, res) => {
  try {
    const updatedDistrict = await District.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedDistrict) {
      res.status(404).json({ message: 'District not found' })
    } else {
      res.status(200).json(updatedDistrict)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteDistrict = async (req, res) => {
  try {
    const deletedDistrict = await District.findByIdAndDelete(req.params.id)
    if (!deletedDistrict) {
      res.status(404).json({ message: 'District not found' })
    } else {
      res.status(200).json({ message: 'District deleted successfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict
}