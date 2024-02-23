const mongoose = require('mongoose')
const Schema = mongoose.Schema

const division4Schema = new Schema({
  type: {
    type: String,
    default: "city"
  },
  name: {
    type: String,
    required: [true, 'Please insert name'],
  },
  postalCode: [{
    type: Number,
    required: [true, 'Please insert postal code'],
  }],
  referencedId: {
    type: Schema.Types.ObjectId,
    refPath: 'referencedModel',
  },
  referencedModel: {
    type: String,
    enum: ['division1', 'division2', 'division3'],
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
})

// Ensure that geojsonId is unique for each upperDivision
division4Schema.index({ name: 1, referencedId: 1 }, { unique: true })

const division4Model = mongoose.model('division4', division4Schema)

module.exports = division4Model