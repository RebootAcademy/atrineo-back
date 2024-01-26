const Collection = require('../models/collection.model')
const Organization = require('../models/organization.model')

// CREATE/POST - create a new collection
const createCollection = async (req, res) => {
  try {
    const { ownerId } = req.params
    const { data, public } = req.body

    const ownerOrganization = await Organization.findById(ownerId)
    if (!ownerOrganization) {
      return res.status(404).json({
        success: false,
        message: 'Owner Organization not found',
      })
    }

    // Collection is created
    const newCollection = await Collection.create({
      public: public || false,
      ownerId,
      creatorId: res.locals.user.organizationId.toString(),
      data: data || []
    })

    return res.status(201).json({
      success: true,
      message: 'Collection created successfully',
      result: newCollection,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating collection',
      description: error.message,
    })
  }
}

// READ/GET - get all collections
const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection
    .find()
    .populate({
      path: 'data',
      select: '-geometry', //Ocultar el campo 'geometry'
      populate: {
        path: 'locationId',
        populate: [
          { path: 'country', select: '-geometry' },
          { path: 'division1', select: '-geometry -country' },
          { path: 'division2', select: '-geometry -upperDivision' },
          { path: 'division3', select: '-geometry -upperDivision' },
          { path: 'division4', select: '-referencedId -referencedModel' },
        ],
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Fetching Collections OK',
      result: collections,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching collections',
      description: error.message,
    })
  }
}

// READ/GET - get ONE Collection by id
const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection
    .findById(req.params.id)
    .populate({
      path: 'data',
      populate: {
        path: 'locationId',
        populate: [
          { path: 'country', select: '-geometry' },
          { path: 'division1', select: '-geometry -country' },
          { path: 'division2', select: '-geometry -upperDivision' },
          { path: 'division3', select: '-geometry -upperDivision' },
          { path: 'division4', select: '-referencedId -referencedModel' },
        ],
      },
    });
    
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Fetching Collection OK',
      result: collection
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching Collection',
      description: error.message
    })
  }
}

// GET OWN ORGANIZATION COLLECTIONS

// UPDATE/PATCH - update ONE Collection by id
const updateCollection = async (req, res) => {
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedCollection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Collection updated successfully',
      result: updatedCollection
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating Collection',
      description: error.message
    })
  }
}

// DELETE - delete ONE Collection by id
const deleteCollection = async (req, res) => {
  try {
    const deletedCollection = await Collection.findByIdAndDelete(req.params.id)

    if (!deletedCollection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Collection deleted successfully',
      result: deletedCollection
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting Collection',
      description: error.message
    })
  }
}

const getAllOwnOrganizationCollections = async (req, res) => {
  try {
    const organizationId = res.locals.user.organizationId.toString()
    const collections = await Collection.find({ ownerId: organizationId })
      .populate({
        path: 'data',
        select: '-geometry',
        populate: {
          path: 'locationId',
          populate: [
            { path: 'country', select: '-geometry' },
            { path: 'division1', select: '-geometry -country' },
            { path: 'division2', select: '-geometry -upperDivision' },
            { path: 'division3', select: '-geometry -upperDivision' },
            { path: 'division4', select: '-referencedId -referencedModel' },
          ],
        },
      })

    return res.status(200).json({
      success: true,
      message: 'Fetching Own Organization Collections OK',
      result: collections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching own organization collections',
      description: error.message,
    })
  }
}

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getAllOwnOrganizationCollections,
}
