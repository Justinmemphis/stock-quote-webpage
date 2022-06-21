const Papa = require('papaparse')
const fs = require('fs')
const csvFilePath = 'nasdaq_screener_061322.csv'
const file = fs.createReadStream(csvFilePath)

// this next section taken completely from stackoverflow - see link in tracking.md
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

exports.lookup = async function(req, res) {
  let userCompany = req.body.companyname
  try {
    let newAnswer = csvData.find(x => x.Name.toLowerCase().includes(userCompany.toLowerCase()))
    return res.json({
      'Your Input': userCompany,
      'Company Name': newAnswer.Name,
      'Stock Symbol': newAnswer.Symbol
    })
  } catch (err) {
    console.log('Error - catch block')
    res.json({
      'Your Input': userCompany,
      'Error': 'No such company found.'
    })
  }
}
