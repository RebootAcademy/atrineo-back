process.stdout.write('\x1B[2J\x1B[0f') // Clear terminal screen

require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const dbConnect = require('./database')

const app = express()
  .use(cors())
  .use(morgan('dev'))
  .use(express.json({ limit: '5mb' }))
  .use(express.urlencoded({ extended: true }))
  .use('/api', require('./api/routes'))
  .listen(process.env.PORT, async (error) => {
    if (error) throw new Error (error)
    await dbConnect()

    console.info(`Atrineo API running on PORT ${process.env.PORT}`)
  })

