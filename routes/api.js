module.exports = function (app) {
  app.route('/')
    .get(function (req, res) {
      console.log('routes/api.js loading correctly')
      res.sendFile(process.cwd() + '/views/index.html')
    })

  app.route('/api/companyname', async (req, res) => {
    try {
      console.log('Company Name: ' + req.body.companyname)
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
