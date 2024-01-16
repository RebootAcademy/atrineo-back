const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  district_id: {
    type: Number,
  },
  district_name: {
    type: String,
  },
  geometry: {
    type: Number,
  },
  district_population: {
    type: Number,
  },
  patents: {
    type: Number,
  },
  research_investment: {
    type: Number,
  },
  it_companies: {
    type: Number,
  },
  gnp: {
    type: Number,
  },
  scholarship_years: {
    type: Number,
  },
  innovation_ecosystem: {
    type: Boolean,
  },
  financing_access: {
    type: Boolean,
  },
  life_quality: {
    type: String,
    enum: ['Alta', 'Media', 'Baja']
  },
  gov_funds_received: {
    type: Boolean,
  }
})

const DataModel = mongoose.model('data', dataSchema)

module.exports = DataModel