const Organization = require('../models/organization.model')

// CREATE/POST - create a new organization
const createOrganization = async (req, res) => {
  try {
    const newOrganization = await Organization.create(req.body)

    return res.status(201).json({
      success: true,
      message: 'Organization created successfully',
      organization: newOrganization
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating organization',
      description: error.message
    })
  }
}

// READ/GET - get all organizations
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find()

    return res.status(200).json({
      success: true,
      message: 'Fetching organizations OK',
      organizations
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching organizations',
      description: error.message
    })
  }
}

// READ/GET - get ONE organization by id
const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id)
    
    if (!organization) {
      return res.status(404).json({ 
        success: false,
        message: 'Organization not found' 
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Fetching organization OK',
      organization
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching organization',
      description: error.message
    })
  }
}

// UPDATE/PATCH - update ONE organization by id
const updateOrganization = async (req, res) => {
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedOrganization) {
      return res.status(404).json({ 
        success: false,
        message: 'Organization not found'
      }
      )
    }

    return res.status(200).json({
      success: true,
      message: 'Organization updated successfully',
      organization: updatedOrganization
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating organization',
      description: error.message
    })
  }
}

// DELETE - delete ONE organization by id
const deleteOrganization = async (req, res) => {
  try {
    const deletedOrganization = await Organization.findByIdAndDelete(req.params.id)

    if (!deletedOrganization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Organization deleted successfully',
      organization: deletedOrganization
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting organization',
      description: error.message
    })
  }
}

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
}
