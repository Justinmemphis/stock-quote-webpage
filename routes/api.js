module.exports = function (app) {

  // below taken from stack overflow - https://stackoverflow.com/questions/49752889/how-can-i-read-a-local-file-with-papa-parse

  const Papa = require('papaparse')
  const fs = require('fs')

  const csvFilePath = 'nasdaq_screener_061322.csv'

  const file = fs.createReadStream(csvFilePath)

  let csvData = []
  Papa.parse(file, {
    header: true,
    step: function(result) {
      csvData.push(result.data)
    },
    complete: function(results, file) {
      console.log('Complete', csvData.length, 'records.')
    }
  })

  // above taken from stack overflow

  app.route('/')
    .get(function (req, res) {
      console.log('routes/api.js loading correctly')
      res.sendFile(process.cwd() + '/views/index.html')
    })

  app.route('/api/companyname')
    .post(async (req, res) => {
    try {
      console.log('Company Name: ' + req.body.companyname)
      console.log(csvData)
      return res.json({
        "Company Name": req.body.companyname
      })
    } catch (err) {
      console.log('Error - catch block')
      res.json({
        error: 'invalid input'
      })
    }
  })

}
