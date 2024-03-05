const { compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

const User = require('../models/user.model')

// POST - user login
const login = async (req, res) => {
  try {
    const { email, password, /* remember */ } = req.body

    const user = await User.findOne({ email }, {
      attributes: {
        exclude: ['password']
      }
    })

    if(!user || !compareSync(password, user.password)) {
      return res.status(500).send(
        { message: 'User or Password incorrect' }
      )
    }

    /* // Set expiration time
    const options = {}
    if (!remember) {
      options.expiresIn = '2d'
    } */

    const token = sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return res.status(200).json({
      success: true,
      message: 'User logged in',
      result: {token, user}
    })

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Failed login in',
      description: error.message
    })
  }
}

module.exports = {
  login
}