/*

const fs = require('fs')
const csvFilePath = './nasdaq_screener_061322.csv'
const file = fs.createReadStream(csvFilePath)
const { usePapaParse } = require('react-papaparse')

const ReadRemoteFile = function(req, res) {
  const { readRemoteFile } = usePapaParse()

  const handleReadRemoteFile = () => {
    readRemoteFile(file, {
        step: (row) => {
          console.log('Row:', row.data)
        },
        complete: () => {
          console.log('All done!')
        }
      })
    }

  return //<button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>
}
*/

/*

// this next section taken completely from stackoverflow - see link in tracking.md
let csvData = [];
console.log('csvData is: ' + csvData);
Papa.parse(file, {
  header: true,
  step: function(result) {
    csvData.push(result.data),
  },
  complete: function(results, file) {
    console.log('Complete', csvData.length, 'records.')
  }
})

const Lookup = function(req, res) {
  let userCompany = req.body.companyname
  try {
    let newAnswer = csvData.find(x => x.Name.toLowerCase().includes(userCompany.toLowerCase()))
    return res.send({
      'Your Input': userCompany,
      'Company Name': newAnswer.Name,
      'Stock Symbol': newAnswer.Symbol
    })
  } catch (err) {
    console.log('Error - catch block')
    res.send({
      'Your Input': userCompany,
      'Error': 'No such company found.'
    })
  }
}
*/

// export {ReadRemoteFile, Lookup};
