module.exports = function (app) {

  const stock_symbol_lookup = require('../controllers/stock_symbol_lookup')
  //const alpha_vantage_stock_quote = require('../controllers/alpha_vantage_stock_quote')

  // first route is to lookup the stock symbol in the CSV file
  /*
  app.route('/api/companyname')
    .post(stock_symbol_lookup.Lookup)
  */

  // second route is to lookup stock data (once you have the stock symbol)
  /*
  app.route('/api/stockquote')
    .post(alpha_vantage_stock_quote.quote)
    */

  app.get('/api', (req, res) => {
    res.send('Hello from server!')
  })

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'))
  })
}
