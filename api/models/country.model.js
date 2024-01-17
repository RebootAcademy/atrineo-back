const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
  iso: { type: String },
  name: { type: String },
  geojsonId: { type: Number },
  geometry: { type: [[[[Number]]]] },
})

const CountryModel = mongoose.model('country', countrySchema)

module.exports = CountryModel