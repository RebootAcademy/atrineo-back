const Region = require('../models/region.model')
const Country = require('../models/country.model')

const createRegion = async (req, res) => {
  try {
    const { features } = req.body

    features.forEach( async (feature) => {
      const { properties, geometry } = feature

      // Search the country by ID_0
      const country = await Country.findOne({ geojsonId: properties.ID_0 })
      
      if (!country) {
        res.status(500).json({
          message: 'Error adding region to the database, country not exist',
          error: error.message,
        })
      }
      
      let coordinates
      if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates;
      if (geometry.type === 'Polygon') coordinates = [ geometry.coordinates ];
      
      const newRegion = new Region({
        country: country._id,
        name: properties.name,
        polygon: coordinates,
        geojsonId: feature.id,
      })

      await newRegion .save()
    })
    
    res.status(201).json({ 
      message: 'Regions added to the database successfully.',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding regions to the database',
      error: error.message,
    })
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

