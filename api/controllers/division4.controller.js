const Division4 = require('../models/division4.model')
const Division3 = require('../models/division3.model')
const Division1 = require('../models/division1.model')

const { createLocation } = require('./location.controller')
const { cleanDistrictName } = require('../utils/cleanDistrictName')

const createDivision4 = async (req, res) => {
  try {
    const cities = req.body

    if (!cities || !Array.isArray(cities)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data in the request body',
      })
    }

    const dataFilter = cities.filter((city) => city.division1 === "Baden-Württemberg")

   for (const city of dataFilter) {
     const { postalCode, cityName, division1 } = city
     let { division3 } = city
     let referencedId, referencedModel, division3Data, division1Data;

      const existingDivision = await Division4.findOne({ name: cityName })

      if (existingDivision) {
        existingDivision.postalCode.push(postalCode)
        await existingDivision.save()

      } else {
        if(division3) {
          division3 = cleanDistrictName(division3)

          division3Data = await Division3.findOne({ name: division3 })
            .populate({
              path: 'upperDivision',
              populate: {
                path: 'upperDivision',
              },
            })
            .exec();
          
          referencedId = division3Data._id
          referencedModel = "division3"

        } else {
          division1Data = await Division1.findOne({ name: division1 })

          referencedId = division1Data._id
          referencedModel = "division1"
        }
    
        const newDivision = new Division4 ({
          name: cityName,
          postalCode,
          referencedId,
          referencedModel,
        })

        await newDivision.save();


        await createLocation({
          division4Id: newDivision._id,
          division3Id: newDivision.referencedModel == "division3" 
            ? division3Data._id 
            : null, 
          division2Id: newDivision.referencedModel == "division3" 
            ? division3Data.upperDivision._id 
            : null, 
          division1Id: newDivision.referencedModel == "division3" 
            ? division3Data.upperDivision.upperDivision._id 
            : division1Data._id, 
          countryId: newDivision.referencedModel == "division3"
            ? division3Data.upperDivision.upperDivision.country
            : division1Data.country,
        })
      }
    }


    return res.status(201).json({
      success: true,
      message: 'Division4 added to the database successfully.',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Error adding division4 to the database',
      error: error.message,
    })
  }
}

const getAllDivision4 = async (req, res) => {
  try {
    const divisions = await Division4.find()
    res.status(200).json(divisions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getDivision4ById = async (req, res) => {
  try {
    const division = await Division4.findById(req.params.id)
    if (!division) {
      res.status(404).json({ message: 'Division not found' })
    } else {
      res.status(200).json(division)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateDivision4 = async (req, res) => {
  try {
    const updatedDivision = await Division4.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedDivision) {
      res.status(404).json({ message: 'Division not found' })
    } else {
      res.status(200).json(updatedDivision)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteDivision4 = async (req, res) => {
  try {
    const deletedDivision = await Division4.findByIdAndDelete(req.params.id)
    if (!deletedDivision) {
      res.status(404).json({ message: 'Division not found' })
    } else {
      res.status(200).json({ message: 'Division deleted successfully' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createDivision4,
  getAllDivision4,
  getDivision4ById,
  updateDivision4,
  deleteDivision4,
}