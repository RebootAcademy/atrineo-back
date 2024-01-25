const Country = require('../models/country.model')

const createCountry = async (req, res) => {
  try {
    const { features } = req.body
    let newCountry

    features.forEach( async (feature) => {
      const { properties, geometry } = feature

      newCountry = await Country.create({
        iso: properties.ISO,
        name: properties.NAME_ENGLI,
        geojsonId: properties.ID_0,
        geometry: geometry.coordinates
      })
    })

    return res.status(201).json({
      success: true,
      message: 'Country created successfully',
      result: newCountry
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding country to the database',
      error: error.message
    })
  }
}

const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find()
    return res.status(201).json({
      success: true,
      message: 'Fetching countries OK',
      result: countries
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching countries',
      descrption: error.message
    })
  }
}

const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id)
    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      })
    } else {
      return res.status(201).json({
        success: true,
        message: 'Fetching country OK',
        result: country
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching country',
      descrption: error.message
    })
  }
}

const updateCountry = async (req, res) => {
  try {
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedCountry) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      })
    } else {
      return res.status(201).json({
        success: true,
        message: 'Updating country OK',
        result: updatedCountry
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating country',
      descrption: error.message
    })
  }
}

const deleteCountry = async (req, res) => {
  try {
    const deletedCountry = await Country.findByIdAndDelete(req.params.id)
    if (!deletedCountry) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      })
    } else {
      return res.status(201).json({
        success: true,
        message: 'Deleting country OK',
        result: deletedCountry
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting country',
      descrption: error.message
    })
  }
}

module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry
}