const mongoose = require('mongoose');

const { checkEmail } = require('../utils/validations');
const { capitalizeWords, toLowercase } = require('../utils/transformWord');

const userSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    default: null,
  },
  name: { 
    type: String,
    set: capitalizeWords,
    required: [true, 'Please insert name'],
  },
  email: {
    type: String,
    set: toLowercase,
    required: [true, 'Please insert email'],
    unique: [true, 'Email address already exists'],
    validate: {
      validator: checkEmail,
      message: props => `${props.value} is not a valid email format`
    },
  },
  password: { 
    type: String,
    required: [true, 'Please insert password'],
  },
  role: { 
    type: String, 
    enum: ['worker', 'admin', 'wizard'], 
    default: 'worker',
  },
},
{ 
  timestamps: false 
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel