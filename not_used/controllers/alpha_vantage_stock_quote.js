// below somewhat copied from: https://www.alphavantage.co/documentation/ and https://rapidapi.com/alphavantage/api/alpha-vantage
// 5 API requests a minute and 500 requests a day

'use strict'
const request = require('request')

exports.quote = function(req, res) {
  let userSymbol = req.body.stocksymbol

  const options = {
    method:'GET',
    url: 'https://www.alphavantage.co/query',
    qs: {
      // interval: '60min',
      function: 'TIME_SERIES_DAILY',
      symbol: userSymbol,
      output_size: 'compact',
      datatype: 'json',
      apikey: process.env.ALPHA_VANTAGE_KEY
    }
  }

  try {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      console.log(body)
      return res.json({
        'Your Input': userSymbol,
        'Result': body
      })
    })
  } catch (err) {
    console.log('Error - catch block')
    res.json({
      'Your Input': userSymbol,
      'Error': 'No such company found.'
    })
  }
}
