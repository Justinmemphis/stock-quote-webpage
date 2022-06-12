module.exports = function (app) {
  app.route('/')
    .get(function (req, res) {
      console.log('routes/api.js loading correctly')
      res.sendFile(process.cwd() + '/views/index.html')
    })
}
