/* const Division4 = require('../models/division4.model')
const Division3 = require('../models/division3.model')
const Division2 = require('../models/division2.model')
const Division1 = require('../models/division1.model')
const Country = require('../models/country.model')

const { createLocation } = require('./location.controller')

const createDivision4 = async (req, res) => {
    try {
        const { features } = req.body

        if (!features || !Array.isArray(features)) {
            return res.status(400).json({ message: 'Invalid features data in the request body' })
        }

        for (let i = 0; i < features.length; i++) {
            const feature = features[i]
            const { properties, geometry } = feature

            const division1 = await Division1.findOne({ geojsonId: properties.ID_1 })
            const division2 = await Division2.findOne({ geojsonId: properties.ID_2 })
            const division3 = await Division3.findOne({ geojsonId: properties.ID_3 })
            const country = await Country.findOne({ geojsonId: properties.ID_0 })

            if (!division3 || !division2 || !division1 || !country) {
                res.status(500).json({
                    message: 'Error adding division4 to the database. Division3, division2, division1 or country does not exist',
                })
            }

            let coordinates
            if (geometry.type === 'MultiPolygon') coordinates = geometry.coordinates
            if (geometry.type === 'Polygon') coordinates = [geometry.coordinates]


            const newDivision4 = new Division4({
                division3: division3._id,
                name: properties.NAME_4,
                type: properties.type,
                geojsonId: properties.ID_4,
                geometry: coordinates,
            })

            await newDivision4.save()
            await createLocation({
                division4Id: newDivision4._id,
                division3Id: division3._id,
                division2Id: division2._id,
                division1Id: division1._id,
                countryId: country._id
            })

        }
        res.status(201).json({
            message: 'Division4 added to the database successfully.',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
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
} */