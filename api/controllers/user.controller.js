const { hashPassword } = require('../utils/hashPassword')

const User = require('../models/user.model')
const Organization = require('../models/organization.model')

// CREATE/POST - create a new user 
const createUser = async (req, res) => {
  try {
    const { organizationId } = req.params
    const { name, email, password, role } = req.body

    const userOrganization = await Organization.findById(organizationId)
    if (!userOrganization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found',
      })
    }

    const hashedPassword = hashPassword(password)

    // User is created
    const newUser = await new User.create({
      organizationId: organizationId,
      name: name,
      email: email,
      password: hashedPassword,
      role: role || 'worker'
    })

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
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
      success: true,
      message: 'Fetching users OK',
      users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
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
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Fetching user OK',
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
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
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
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
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      user: deletedUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting user',
      description: error.message
    })
  }
}

// -------------- CRUD FOR ORGANIZATION ADMIN ROLE --------------

// CREATE/POST - create a new organization user 
const createOwnOrganizationUser = async (req, res) => {
  try {
    const organizationId = res.locals.user.organizationId.toString()
    const { name, email, password, role } = req.body

    if (role === 'wizard') {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Only "admin" or "worker" roles are allowed.'
      });
    }

    const userEmail = await User.findOne({ email })
    if (userEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      })
    }

    const userOrganization = await Organization.findById(organizationId)
    if (!userOrganization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      })
    }

    const hashedPassword = hashPassword(password)

    // User is created
    const newUser = new User({
      organizationId,
      name,
      email,
      password: hashedPassword,
      role: role || 'worker'
    })

    await newUser.save()

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating user',
      description: error.message
    })
  }
}

// READ/GET - get all organization users
const getOwnOrganizationUsers = async (req, res) => {
  try {
    const organizationId = res.locals.user.organizationId.toString()
    const users = await User.find({ organizationId });


    return res.status(200).json({
      success: true,
      message: 'Fetching users OK',
      users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching users',
      description: error.message
    })
  }
}

// READ/GET - get ONE user by id
const getOwnOrganizationUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      organizationId: res.locals.user.organizationId.toString(),
    })
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Fetching user OK',
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching user',
      description: error.message
    })
  }
}

// UPDATE/PATCH - update ONE user by id
const updateOwnOrganizationUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { 
        _id: req.params.id,
        organizationId: res.locals.user.organizationId.toString(),
        role: { $ne: 'wizard' },
      },
      req.body,
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating user',
      description: error.message
    })
  }
}

// DELETE - delete ONE user by id
const deleteOwnOrganizationUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      _id: req.params.id,
      organizationId: res.locals.user.organizationId.toString(),
      role: { $ne: 'wizard' },
    })

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      user: deletedUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
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
  deleteUser,
  createOwnOrganizationUser,
  getOwnOrganizationUsers,
  getOwnOrganizationUser,
  updateOwnOrganizationUser,
  deleteOwnOrganizationUser,
}
