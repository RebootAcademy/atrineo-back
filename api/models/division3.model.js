const mongoose = require('mongoose')
const Schema = mongoose.Schema

const division3Schema = new Schema({
  type: {
    type: String,
    required: [true, 'Please insert division type'],
  },
  name: {
    type: String,
    required: [true, 'Please insert name'],
  },
  geojsonId: {
    type: Number,
  },
  geometry: {
    type: [[[[ Number ]]]],
  },
  upperDivision: {
    type: Schema.Types.ObjectId,
    ref: 'division2',
  },
})

// Ensure that geojsonId is unique for each upperDivision
division3Schema.index({ geojsonId: 1, upperDivision: 1 }, { unique: true })

const division3Model = mongoose.model('division3', division3Schema)

module.exports = division3Model