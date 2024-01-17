const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
  iso: { type: String },
  name: { type: String },
  geojsonId: { type: Number },
  geometry: { type: [[[[Number]]]] },
})

const CountryModel = mongoose.model('Country', countrySchema)

module.exports = CountryModel