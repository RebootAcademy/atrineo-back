const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
  iso: {
    type: String,
    required: [true, 'Please insert iso code'],
  },
  name: { 
    type: String,
    required: [true, 'Please insert country name'],
  },
  polygon: {
    type: [[[[ Number ]]]]
  },
  geojsonId: { 
    type: Number
  }
})

const CountryModel = mongoose.model('country', countrySchema)

module.exports = CountryModel