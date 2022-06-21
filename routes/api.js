module.exports = function (app) {

  const stock_symbol_lookup = require('../controllers/stock_symbol_lookup')
  const alpha_vantage_stock_quote = require('../controllers/alpha_vantage_stock_quote')

  // first route is to lookup the stock symbol in the CSV file
  app.route('/api/companyname')
    .post(stock_symbol_lookup.lookup)

  // second route is to lookup stock data (once you have the stock symbol)
  app.route('/api/stockquote')
    .post(alpha_vantage_stock_quote.quote)

  app.route('/')
    .get(function (req, res) {
      console.log('routes/api.js loading correctly')
      res.sendFile(process.cwd() + '/views/index.html')
    })

}
