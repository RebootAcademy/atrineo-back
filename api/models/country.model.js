const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
  iso: {
    type: String,
    required: [true, 'Please insert iso code'],
  },
  name: {
    type: String,
    required: [true, 'Please insert name'],
  },
  geojsonId: {
    type: Number
  },
  geometry: {
    type: [[[[Number]]]]
  },
})

const CountryModel = mongoose.model('country', countrySchema)

module.exports = CountryModel