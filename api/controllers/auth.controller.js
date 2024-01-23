const { compareSync, genSaltSync, hashSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

const User = require('../models/user.model')
const Organization = require('../models/organization.model')

// CREATE/POST - user register
const signup = async (req, res) => {
  /* try {
    const { organization } = req.params


    if (!organization && res.locals.user) {
      organization = res.locals.user.organization.toString()
    }

    const { name, email, password, role } = req.body

    const userEmail = await User.findOne({ email })
    if (userEmail) {
      return res.status(400).json(
        { message: 'Email already exists' }
      )
    }

    const userOrganization = await Organization.findById(organization)
    if (!userOrganization) {
      return res.status(404).json(
        { message: 'Organization not found' }
      )
    }

    // Hash the password before saving it to the database
    const salt = genSaltSync(parseInt(process.env.BCRYPT_SALTROUNDS) || 10)
    const hashedPassword = hashSync(password, salt)

    // User is created
    const newUser = new User({
      organization: organization,
      name: name,
      email: email,
      password: hashedPassword,
      role: role || 'worker'
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
  } */
}

// POST - user login
const login = async (req, res) => {
  try {
    const { email, password, /* remember */ } = req.body

    const user = await User.findOne({ email })

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

    // Create a JSON Web Token
    const token = sign({ email: user.email }, process.env.JWT_SECRET, /* options */)

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