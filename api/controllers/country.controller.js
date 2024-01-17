const Country = require('../models/country.model')

const createCountry = async (req, res) => {
  try {
    const { features } = req.body

    features.forEach( async (feature) => {
      const { properties, geometry } = feature

      const newCountry = new Country({
        iso: properties.ISO,
        name: properties.NAME_ENGLI,
        polygon: geometry.coordinates,
        geojsonId: properties.ID_0,
      })

      await newCountry.save()
    })

    res.status(201).json({ 
      message: 'Country added to the database successfully.',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding country to the database',
      error: error.message,
    })
  }
}

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find()
    res.status(200).json(countries)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id)
    if (!country) {
      res.status(404).json({ message: 'Country not found' })
    } else {
      res.status(200).json(location)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateCountry = async (req, res) => {
  try {
    const updatedCountry = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedCountry) {
      res.status(404).json({ message: 'Country not found' })
    } else {
      res.status(200).json(updatedCountry)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteCountry = async (req, res) => {
  try {
    const deletedCountry = await Country.findByIdAndDelete(req.params.id)
    if (!deletedCountry) {
      res.status(404).json({ message: 'Country not found' })
    } else {
      res.status(200).json({ message: 'Country deleted successfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry
}