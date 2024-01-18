const District = require('../models/district.model')
const Region = require('../models/region.model')
const { createLocation } = require('./location.controller')

const createDistrict = async (req, res) => {
  try {
    const { features } = req.body

    features.forEach( async (feature) => {
      const { properties, geometry } = feature

      // Search the district by ID_1
      const region = await Region.findOne({ geojsonId: properties.ID_1 })
        .populate({
          path: 'country',
          match: { geojsonId: properties.ID_0 }, // Ensure the country's geojsonId matches properties.ID_0
        })
        .exec()

      if (!region) {
        res.status(500).json({
          message: 'Error adding district to the database, region or country not exist',
          error: error.message,
        })
      }
      
      let coordinates
      if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates;
      if (geometry.type === 'Polygon') coordinates = [ geometry.coordinates ];
      
      const newDistrict = new District({
        region: region._id,
        name: properties.NAME_2,
        polygon: coordinates,
        geojsonId: properties.ID_2,
      })

      await newDistrict.save()
      await createLocation(region.country._id, region._id, newDistrict._id);

    })
    res.status(201).json({ 
      message: 'Districts added to the database successfully.',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding districts to the database',
      error: error.message,
    })
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