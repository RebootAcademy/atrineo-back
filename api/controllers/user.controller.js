const { genSaltSync, hashSync } = require('bcrypt')

const User = require('../models/user.model')
const Organization = require('../models/organization.model')

// CREATE/POST - create a new user
const createUser = async (req, res) => {
  try {
    const { email, organization } = req.body

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
    const salt = genSaltSync(parseInt(process.env.BCRYPT_SALTROUNDS))
    req.body.password = hashSync(req.body.password, salt)

    // user is created
    const newUser = new User(req.body)
    await newUser.save()

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating user',
      description: error.message
    })
  }
}

// READ/GET - get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()

    return res.status(200).json({
      message: 'Fetching users OK',
      users
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching users',
      description: error.message
    })
  }
}

// READ/GET - get ONE user by id
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    
    if (!user) {
      return res.status(404).json(
        { message: 'User not found' }
      )
    }

    return res.status(200).json({
      message: 'Fetching user OK',
      user
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching user',
      description: error.message
    })
  }
}

// UPDATE/PATCH - update ONE user by id
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json(
        { message: 'User not found' }
      )
    }

    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating user',
      description: error.message
    })
  }
}

// DELETE - delete ONE user by id
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) {
      return res.status(404).json(
        { message: 'User not found' }
      )
    }

    return res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting user',
      description: error.message
    })
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
