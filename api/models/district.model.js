// district.model.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const districtSchema = new Schema({
  name: {
    type: String
  },
  polygon: {
    type: [[[[ Number ]]]]
  },
  geojsonId: {
    type: Number
  },
  region: {
    type: Schema.Types.ObjectId, 
    ref: 'region'
  }
})

const DistrictModel = mongoose.model('district', districtSchema)

module.exports = DistrictModel