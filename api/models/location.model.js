const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
  country: {
    type: Schema.Types.ObjectId,
    ref: 'country',
  },
  division1: {
    type: Schema.Types.ObjectId,
    ref: 'division1',
  },
  division2: {
    type: Schema.Types.ObjectId,
    ref: 'division2',
  },
  division3: {
    type: Schema.Types.ObjectId,
    ref: 'division3',
  },
  division4: {
    type: Schema.Types.ObjectId,
    ref: 'division4',
  },
})

const LocationModel = mongoose.model('location', locationSchema)

module.exports = LocationModel