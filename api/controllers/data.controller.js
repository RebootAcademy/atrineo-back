const Collection = require('../models/collection.model')
const Data = require('../models/data.model')
const Division4 = require('../models/division4.model')
const Location = require('../models/location.model')
const { transformData } = require('../utils/transformData')

// CREATE/POST - create a new data
const createData = async (req, res) => {
  try {
    const newDataArray = []

    const { collectionId } = req.params
    const collection = await Collection.findById(collectionId)

    for (const element of req.body) {
      element.geometry = transformData(element.geometry)

      let division4
      if (element.districtId) {
        division4 = await Division4.findOne({ postalCode: { $in: element.districtId } })
      } else {
        division4 = await Division4.findOne({ name: element.districtName })
      }

      const location = await Location.findOne({ division4 });

      const newData = await Data.create({
        ...element,
        locationId: location._id
      })

      newDataArray.push({
        _id: newData._id,
        name: newData.name,
        latitud: newData.latitude,
        longitude: newData.longitude,
        districtId: newData.districtId,
        districtName: newData.districtName,
        locationId: newData.locationId,
      })

      collection.data.push(newData._id)
    }
    await collection.save()

    return res.status(201).json({
      success: true,
      message: 'Data created successfully',
      result: newDataArray
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error creating data',
      description: error.message,
    })
  }
}

const createOneData = async(req, res) => {
  try {
    if(req.body.geometry) transformData(req.body.geometry)

    let division4
    if (req.body.districtId) {
      division4 = await Division4.findOne({ postalCode: { $in: req.body.districtId } })
    } else {
      division4 = await Division4.findOne({ name: req.body.districtName })
    }
    const location = await Location.findOne({ division4 })

    const data = await Data.create({
      ...req.body,
      locationId: location._id
    })
    return res.status(200).json({
      success: true,
      message: 'Creating one data OK',
      result: data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating one data',
      description: error.message,
    })
  }
}

// READ/GET - get all datas
const getAllData = async (req, res) => {
  try {
    const datas = await Data.find()

    return res.status(200).json({
      success: true,
      message: 'Fetching Datas OK',
      result: datas,
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
const getDataById = async (req, res) => {
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
      result: data
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
      result: updatedData
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
      result: deletedData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting data',
      description: error.message
    })
  }
}

const uploadDemoCsv = async (req, res) => {
  try {
    const { body, collectionType } = req.body

    const collection = await Collection.findByIdAndUpdate(process.env.DEMO_ID, {
      data: [],
      collectionType
    });

    await Data.deleteMany({})

    await Promise.all(body.map(async element => {

      let division4
      let arr = []
      if (element.districtId) {
        division4 = await Division4.findOne({ postalCode: { $in: element.districtId } })
      } else {
        division4 = await Division4.findOne({ name: element.districtName })
      }
      const location = await Location.findOne({ division4 })

      for (key in element) {
        const obj = {}
        obj.fieldName = key

        if (key === 'latitude' || key === 'longitude') {
          console.log(typeof element[key])
          obj.fieldValue = parseFloat(element[key].replace(',', '.'))
        } else {
          obj.fieldValue = element[key]
        }
        if (element[key] === 'FALSE' || element[key] === 'TRUE') {
          obj.fieldType = 'boolean'
        } else {
          obj.fieldType = typeof obj.fieldValue
        }

        arr.push(obj)
      }
      const newData = await Data.create({
        fields: arr,
        locationId: location._id
      })

      collection.data.push(
        newData._id
      )
    }))
    await collection.save()

    return res.status(200).json({
      success: true,
      message: "New csv data uploaded succesfully",
      result: collection,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error uploading new csv data",
      description: error.message,
    });
  }
}

module.exports = {
  createData,
  createOneData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
  uploadDemoCsv
}
