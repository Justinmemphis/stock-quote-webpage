import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'


const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const apiRoutes = require('./routes/api.js')
const api_key = process.env.ALPHA_VANTAGE_KEY

let app = express()

app.use('/public', express.static(process.cwd() + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
apiRoutes(app)

const port = process.env.Port || 3000

app.listen(port, function() {
  console.log('Listening on port ' + port)
})

app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found')
})