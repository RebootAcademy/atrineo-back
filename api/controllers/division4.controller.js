const Division4 = require('../models/division4.model')
const Division3 = require('../models/division3.model')
const Division1 = require('../models/division1.model')

const { createLocationInDivision4 } = require('./location.controller')
const { cleanDistrictName } = require('../utils/cleanDistrictName')

const createDivision4 = async (req, res) => {
  try {
    const cities = req.body
    const newDivisionsArray = []

    if (!cities || !Array.isArray(cities)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data in the request body' 
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

        const existingDivisionIndex = newDivisionsArray.findIndex(
          (item) => item.division4._id.toString() === existingDivision._id.toString()
        )

        if (existingDivisionIndex !== -1) {
          newDivisionsArray[existingDivisionIndex].division4.postalCode = existingDivision.postalCode
        }

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
    
        const newDivision4 = await Division4.create ({
          name: cityName,
          postalCode,
          referencedId,
          referencedModel,
        })

        const location = await createLocationInDivision4({
          division4Id: newDivision4._id,
          division3Id: newDivision4.referencedModel == "division3" 
            ? division3Data._id 
            : null, 
          division2Id: newDivision4.referencedModel == "division3" 
            ? division3Data.upperDivision._id 
            : null, 
          division1Id: newDivision4.referencedModel == "division3" 
            ? division3Data.upperDivision.upperDivision._id 
            : division1Data._id, 
          countryId: newDivision4.referencedModel == "division3"
            ? division3Data.upperDivision.upperDivision.country
            : division1Data.country,
        })

        newDivisionsArray.push({
          division4: newDivision4,
          location
        })
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Division4 created successfully',
      result: newDivisionsArray
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating division4',
      error: error.message,
    })
  }
}

const createOneDivision4 = async (req, res) => {
  try {
    const city = req.body
    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data in the request body'
      })
    }

    const { postalCode, cityName, division1, division3 } = city
    let referencedId, referencedModel, division3Data, division1Data

    const existingDivision = await Division4.findOne({ name: cityName })

    if (existingDivision) {
      existingDivision.postalCode.push(postalCode)
      await existingDivision.save()
    } else {
      if (division3) {
        division3 = cleanDistrictName(division3)

        division3Data = await Division3.findOne({ name: division3 })
          .populate({
            path: 'upperDivision',
            populate: {
              path: 'upperDivision',
            },
          })
          .exec()

        referencedId = division3Data._id
        referencedModel = 'division3'
      } else {
        division1Data = await Division1.findOne({ name: division1 })
        referencedId = division1Data._id
        referencedModel = 'division1'
      }

      const newDivision4 = await Division4.create({
        name: cityName,
        postalCode,
        referencedId,
        referencedModel,
      })

      await createLocation({
        division4Id: newDivision4._id,
        division3Id: referencedModel === 'division3'
          ? division3Data._id
          : null,
        division2Id: referencedModel === 'division3'
          ? division3Data.upperDivision._id
          : null,
        division1Id: referencedModel === 'division3'
          ? division3Data.upperDivision.upperDivision._id
          : division1Data._id,
        countryId: referencedModel === 'division3'
          ? division3Data.upperDivision.upperDivision.country
          : division1Data.country,
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Division4 created successfully',
      result: newDivision4
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating division4',
      error: error.message,
    })
  }
}

const getAllDivision4 = async (req, res) => {
  try {
    const divisions = await Division4.find()
    return res.status(200).json({
      success: true,
      message: 'All division4 fetched successfully',
      result: divisions
    })  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching all division4',
      description: error.message
    })  
  }
}

const getDivision4ById = async (req, res) => {
  try {
    const division4 = await Division4.findById(req.params.id)
    if (!division4) {
      return res.status(404).json({
          success: false,
          message: 'Division4 not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Division4 fetched successfully',
      result: division4
    })  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching division4',
      description: error.message
    })  
  }
}

const updateDivision4 = async (req, res) => {
  try {
    const updatedDivision4 = await Division4.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    )
    if (!updatedDivision4) {
      return res.status(404).json({
          success: false,
          message: 'Division4 not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Division4 updated successfully',
      result: updatedDivision4
    })  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating division4',
      description: error.message
    }) 
  }
}

const deleteDivision4 = async (req, res) => {
  try {
    const deletedDivision4 = await Division4.findByIdAndDelete(req.params.id)
    if (!deletedDivision4) {
      return res.status(404).json({
          success: false,
          message: 'Division4 not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Division4 deleted successfully',
      result: deletedDivision4
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting division4',
      description: error.message
    })  
  }
}

const addCoordinates = async (req, res) => {
  try {
    const { body } = req.body
    await Promise.all(body.map(async district => {
      const lat = district.latitude.replace(',', '.')
      const lon = district.longitude.replace(",", ".");

      await Division4.findOneAndUpdate(
        { name: district.districtName },
        {
          $set: {
            latitude: lat,
            longitude: lon
          },
          $unset: {
            lat: '',
            lon: ''
          }
        }
      );
    }))

    return res.status(200).json({
      success: true,
      message: "Added coordinates successfully",
      result: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding coordinates",
      description: error.message,
    }); 
  }
}

module.exports = {
  createDivision4,
  createOneDivision4,
  getAllDivision4,
  getDivision4ById,
  updateDivision4,
  deleteDivision4,
  addCoordinates
}