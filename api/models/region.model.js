// region.model.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const regionSchema = new Schema({
  name: { 
    type: String
  },
  polygon: { 
    type: [[[[ Number ]]]]
  },
  geojsonId: { 
    type: Number
  },
  country: { 
    type: Schema.Types.ObjectId, 
    ref: 'country'
   }
})

const RegionModel = mongoose.model('region', regionSchema)

module.exports = RegionModel