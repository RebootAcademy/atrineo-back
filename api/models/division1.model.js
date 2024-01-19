const mongoose = require('mongoose')
const Schema = mongoose.Schema

const division1Schema = new Schema({
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
  country: {
    type: Schema.Types.ObjectId,
    ref: 'country',
  },
})

// Ensure that geojsonId is unique for each country
division1Schema.index({ geojsonId: 1, country: 1 }, { unique: true })

const division1Model = mongoose.model('division1', division1Schema)

module.exports = division1Model