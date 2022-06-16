exports.quote = async function(req, res) {
  let userSymbol = req.body.stocksymbol
  try {
    // let newAnswer = csvData.find(x => x.Name.toLowerCase().includes(userCompany.toLowerCase()))
    return res.json({
      'Your Input': userSymbol
    })
  } catch (err) {
    console.log('Error - catch block')
    res.json({
      'Your Input': userSymbol,
      'Error': 'No such company found.'
    })
  }
}
