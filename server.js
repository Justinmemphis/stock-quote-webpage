const express = require('express')
const bodyParser = require('body-parser')

const apiRoutes = require('./routes/api.js')

let app = express()

app.use('/public', express.static(process.cwd() + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

apiRoutes(app)

app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found')
})

const port = process.env.Port || 3000

app.listen(port, function() {
  console.log('Listening on port ' + port)
})
