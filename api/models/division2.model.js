const mongoose = require('mongoose')
const Schema = mongoose.Schema

const division2Schema = new Schema({
  type: {
    type: String,
    required: [true, 'Please insert division type'],
  },
  name: {
    type: String,
    required: [true, 'Please insert name'],
  },
  geojsonId: {
    type: Number,
  },
  geometry: {
    type: [[[[ Number ]]]],
  },
  upperDivision: {
    type: Schema.Types.ObjectId,
    ref: 'division1',
  },
})

const division2Model = mongoose.model('division2', division2Schema)

module.exports = division2Model