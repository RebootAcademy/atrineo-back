const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({
  fields: [{
    fieldName: String,
    fieldValue: mongoose.Schema.Types.Mixed,
    fieldType: String,
    _id: false
  }],
  locationId: {
    type: Schema.Types.ObjectId,
    ref: 'location',
  },
})

const DataModel = mongoose.model('data', dataSchema)

module.exports = DataModel