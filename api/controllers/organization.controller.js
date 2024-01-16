const Organization = require('../models/organization.model')

// CREATE/POST - create a new organization
const createOrganization = async (req, res) => {
  try {
    const { email } = req.body

    /* const organizaionEmail = await Organization.findOne({ email })
    if (organizaionEmail) {
      return res.status(400).json(
        { message: 'Email already exists' }
      )
    } */

    // organization is created
    const newOrganization = new Organization(req.body)
    await newOrganization.save()

    return res.status(201).json({
      message: 'Organization created successfully',
      organization: newOrganization
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating organization',
      description: error.message
    })
  }
}

// READ/GET - get all organizations
const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find()

    return res.status(200).json({
      message: 'Fetching organizations OK',
      organizations
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching organizations',
      description: error.message
    })
  }
}

// READ/GET - get ONE organization by id
const getOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id)
    
    if (!organization) {
      return res.status(404).json(
        { message: 'Organization not found' }
      )
    }

    return res.status(200).json({
      message: 'Fetching organization OK',
      organization
    })
  } catch (error) {
    return res.status(500).json({
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
      return res.status(404).json(
        { message: 'Organization not found' }
      )
    }

    return res.status(200).json({
      message: 'Organization updated successfully',
      organization: updatedOrganization
    })
  } catch (error) {
    return res.status(500).json({
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
      return res.status(404).json(
        { message: 'Organization not found' }
      )
    }

    return res.status(200).json({
      message: 'Organization deleted successfully',
      organization: deletedOrganization
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting organization',
      description: error.message
    })
  }
}

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization
}
