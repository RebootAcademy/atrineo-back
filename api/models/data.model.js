const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({
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
    enum: ['high', 'medium', 'low']
  },
  govFundsReceived: {
    type: Boolean,
  },
  locationId: {
    type: Schema.Types.ObjectId,
    ref: 'location',
  },
})

const DataModel = mongoose.model('data', dataSchema)

module.exports = DataModel