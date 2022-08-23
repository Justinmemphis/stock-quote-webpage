import React, {
  // useEffect,
  useState
} from 'react';
import request from 'request';
require('dotenv').config();

// below somewhat copied from: https://www.alphavantage.co/documentation/ and https://rapidapi.com/alphavantage/api/alpha-vantage
// 5 API requests a minute and 500 requests a day

export function QuoteLookup() {
  const [submittedSymbol, setSubmittedSymbol] = useState('');
  const [output, setOutput] = useState({});



  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let newSymbol = formData.get('stocksymbol');
    setSubmittedSymbol(newSymbol);
    console.log('key is: ' + process.env.REACT_APP_ALPHA_VANTAGE_KEY);

    /*
    const options = {
      method: 'GET',
      url: 'https://www.alphavantage.co/query',
      qs: {
        // interval: '60min',
        function: 'TIME_SERIES_DAILY',
        symbol: submittedSymbol,
        output_size: 'compact',
        datatype: 'json',
        apikey: process.env.REACT_APP_ALPHA_VANTAGE_KEY
      }
    };

    try {
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
      });
      return;
    } catch (err) {
      return;
    };
    */
  };

  return (
    <section>
      <h2>Stock Quote</h2>
      <h3>From Alpha Vantage</h3>
      <form id='stock-quote' onSubmit={handleSubmit}>
        <input id='stocksymbol' type='text' name='stocksymbol' placeholder='Stock Symbol' />
        <button type='submit'>Submit</button>
      </form>
    </section>
  )
}
