const mongoose = require('mongoose');

const { checkEmail } = require('../utils/validations')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please insert email'],
    validate: {
      validator: checkEmail(v),
      message: props => `${props.value} is not a valid email format`
    },
  },
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel