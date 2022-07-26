const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const apiRoutes = require('./routes/api.js')
const api_key = process.env.ALPHA_VANTAGE_KEY
const nocache = require('nocache')

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, '/public','build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('etag', false)
app.use(nocache())

apiRoutes(app)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
