const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  districtId: {
    type: Number,
  },
  districtName: {
    type: String,
  },
  geometry: {
    type: [[Number]],
  },
  districtPopulation: {
    type: Number,
  },
  patents: {
    type: Number,
  },
  researchInvestment: {
    type: Number,
  },
  itCompanies: {
    type: Number,
  },
  gnp: {
    type: Number,
  },
  scholarshipYears: {
    type: Number,
  },
  innovationEcosystem: {
    type: Boolean,
  },
  financingAccess: {
    type: Boolean,
  },
  lifeQuality: {
    type: String,
    enum: ['Alta', 'Media', 'Baja']
  },
  govFundsReceived: {
    type: Boolean,
  },
  locationId: {
    type: Number,
  }
})

const DataModel = mongoose.model('data', dataSchema)

module.exports = DataModel