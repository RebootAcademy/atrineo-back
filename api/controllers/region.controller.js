const Region = require('../models/country.model')

const createRegion = async (req, res) => {
  try {
    const newRegion = await Region.create(req.body)
    res.status(201).json(newRegion)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getRegions = async (req, res) => {
  try {
    const regions = await Region.find()
    res.status(200).json(regions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getRegionById = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id)
    if (!region) {
      res.status(404).json({ message: 'Region not found' })
    } else {
      res.status(200).json(region)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateRegion = async (req, res) => {
  try {
    const updatedRegion = await Region.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedRegion) {
      res.status(404).json({ message: 'Region not found' })
    } else {
      res.status(200).json(updatedRegion)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteRegion = async (req, res) => {
  try {
    const deletedRegion = await Region.findByIdAndDelete(req.params.id)
    if (!deletedRegion) {
      res.status(404).json({ message: 'Region not found' })
    } else {
      res.status(200).json({ message: 'Region deleted successfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createRegion,
  getRegions,
  getRegionById,
  updateRegion,
  deleteRegion
}

