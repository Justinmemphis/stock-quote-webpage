module.exports = function (app) {

  const quote_lookup = require('../controllers/quote_lookup')
  const stock_quote = require('../controllers/stock_quote')

  app.route('/api/companyname')
    .post(quote_lookup.lookup)

  app.route('/api/stockquote')
    .post(stock_quote.quote)

  app.route('/')
    .get(function (req, res) {
      console.log('routes/api.js loading correctly')
      res.sendFile(process.cwd() + '/views/index.html')
    })

}
