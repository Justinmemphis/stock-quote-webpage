// started based off of this website: https://reactjs.org/docs/add-react-to-a-website.html
// also from here: https://reactjs.org/docs/forms.html
// also: https://stackoverflow.com/questions/58579975/how-to-invoke-a-component-on-handlesubmit-in-react
// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

function NameLookup (props) {
  return <h3>{props.value}>/h3>
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      lookupOutput: [],
      showInfo: false
     };

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
       value: event.target.value,
       lookupOutput: event.target.value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value + ' ' + this.state.lookupOutput);
    event.preventDefault();
    this.setState({ showInfo: true })
  }


  render() {
    return (
      //<div id='lookup-output'>{this.state.lookupOutput}</div>
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type='text' value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type='submit' value='submit' onClick={this.handleSubmit} />
        </form>
        {this.state.showInfo ? <NameLookup /> : null}
      </div>


    );
  }
}
/*
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

*/

ReactDOM.render(<App />, document.getElementById('company_name_container'));
