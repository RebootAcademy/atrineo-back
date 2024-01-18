const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collectionSchema = new Schema({
  public: {
    type: Boolean,
    default: false,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
  },
  data: [{
    type: Schema.Types.ObjectId,
    ref: 'data',
  }],
})

const collectionModel = mongoose.model('collection', collectionSchema)

module.exports = collectionModel