const mongoose = require('mongoose')
const Schema = mongoose.Schema

const division2Schema = new Schema({
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
    ref: 'division1',
  },
})

// Ensure that geojsonId is unique for each upperDivision
division2Schema.index({ geojsonId: 1, upperDivision: 1 }, { unique: true })

const division2Model = mongoose.model('division2', division2Schema)

module.exports = division2Model