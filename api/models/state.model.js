// state.model.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stateSchema = new Schema({
  name: { type: String },
  geojsonId: { type: Number },
  geometry: { type: [[[[Number]]]] },
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
})

const StateModel = mongoose.model('State', stateSchema)

module.exports = StateModel