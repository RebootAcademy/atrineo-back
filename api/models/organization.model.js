const mongoose = require('mongoose');

const { checkEmail } = require('../utils/validations');
const { toLowercase } = require('../utils/transformWord');

const organizationSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, 'Please insert name'],
  },
  email: {
    type: String,
    set: toLowercase,
    required: [true, 'Please insert email'],
    validate: {
      validator: checkEmail,
      message: props => `${props.value} is not a valid email format`
    },
  },
},
{ 
  timestamps: false 
})

const OrganizationModel = mongoose.model('organization', organizationSchema)

module.exports = OrganizationModel