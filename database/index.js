const mongoose = require('mongoose')

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME
    })
    console.info(`Connected to DB`)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

module.exports = dbConnect