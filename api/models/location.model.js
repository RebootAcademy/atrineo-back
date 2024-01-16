const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  ID_1: { type: Number },
  ID_2: { type: Number },
  ID_3: { type: Number, unique: true },
  NAME_1: { type: String },
  NAME_2: { type: String },
  NAME_3: { type: String, unique: true },
})

const LocationModel = mongoose.model('location', locationSchema)

module.exports = LocationModel