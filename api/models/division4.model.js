const mongoose = require('mongoose')
const Schema = mongoose.Schema

const division4Schema = new Schema({
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
    ref: 'division3',
  },
})

// Ensure that geojsonId is unique for each upperDivision
division4Schema.index({ geojsonId: 1, upperDivision: 1 }, { unique: true })

const division4Model = mongoose.model('division4', division4Schema)

module.exports = division4Model