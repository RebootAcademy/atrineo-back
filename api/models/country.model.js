const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
  name: { type: String },
  polygon: { type: [[Number]] },
  geojsonId: { type: Number }
})

const CountryModel = mongoose.model('Country', countrySchema)

module.exports = CountryModel