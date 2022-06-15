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
      let userCompany = req.body.companyname
      // console.log('Company Name: ' + userCompany)
      // console.log(typeof userCompany)
      //console.log(csvData)
      // console.log(csvData[0].Name) // how to reference fields in array
      let newAnswer = csvData.find(x => x.Name.toLowerCase().includes(userCompany.toLowerCase()))
      // console.log(newAnswer)
      return res.json({
        "Your Input": userCompany,
        "Company Name": newAnswer.Name,
        "Stock Symbol": newAnswer.Symbol
      })
    } catch (err) {
      console.log('Error - catch block')
      res.json({
        error: 'invalid input'
      })
    }
  })

}

// AECOM Common Stock
// ACNB Corporation Common Stock
