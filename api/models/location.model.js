// location.model.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  region: { type: Schema.Types.ObjectId, ref: 'Region' },
  district: { type: Schema.Types.ObjectId, ref: 'District' }
})

const LocationModel = mongoose.model('Location', locationSchema)

module.exports = LocationModel