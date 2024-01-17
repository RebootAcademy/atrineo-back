// location.model.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
  country: { 
    type: Schema.Types.ObjectId,
    ref: 'country'
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'region'
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: 'district'
  }
})

const LocationModel = mongoose.model('location', locationSchema)

module.exports = LocationModel