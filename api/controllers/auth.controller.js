const { compareSync, genSaltSync, hashSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const User = require('../models/user.model')
const Organization = require('../models/organization.model')

const signup = async (req, res) => {
  try {
    const { user, organization } = req.body

    const userEmail = await User.findOne({ email: user.email })
    if (userEmail) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const salt = genSaltSync(parseInt(process.env.BCRYPT_SALTROUNDS) || 10)
    const hashedPassword = hashSync(user.passwords, salt)

    // User is created
    const newUser = new User({
      organization: user.organization,
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role || 'worker'
    })
    await newUser.save()

    // create a JSON Web Token
    const token = sign({ email: newUser.email }, process.env.JWT_SECRET)

    return res.status(200).json({
      message: 'User created successfully',
      token
    })

  } catch (error) {
    return res.status(500).send({
      message: 'error creating user',
      description: error.message
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body

    const user = await User.findOne({ email })

    if(!user || !compareSync(password, user.password)) {
      return res.status(500).send({ message: 'User or Password incorrect' })
    }

    // Set expiration time
    const options = {}
    if (!remember) {
      options.expiresIn = '2d'
    }

    // Create a JSON Web Token
    const token = sign({ email: user.email }, process.env.JWT_SECRET, options)

    return res.status(200).json({
      message: 'User logged in',
      token
    })

  } catch (error) {
    return res.status(500).send({
      message: 'Failed login in',
      description: error.message
    })
  }
}

module.exports = {
  signup,
  login
}