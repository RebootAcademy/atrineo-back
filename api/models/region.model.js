// region.model.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const regionSchema = new Schema({
  name: { type: String },
  geojsonId: { type: Number },
  geometry: { type: [[[[Number]]]] },
  state: { type: Schema.Types.ObjectId, ref: 'State' },
})

const RegionModel = mongoose.model('Region', regionSchema)

module.exports = RegionModel