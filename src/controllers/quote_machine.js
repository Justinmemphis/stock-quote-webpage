import React, {
  useState
} from 'react';
import request from 'request';
require('dotenv').config();

// below somewhat copied from: https://www.alphavantage.co/documentation/ and
// https://rapidapi.com/alphavantage/api/alpha-vantage
// 5 API requests a minute and 500 requests a day

export function QuoteLookup() {
  const [mySymbol, setMySymbol] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [output, setOutput] = useState({});

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let newSymbol = formData.get('stocksymbol');
    setMySymbol(newSymbol);

    const options = {
      method: 'GET',
      url: 'https://www.alphavantage.co/query',
      qs: {
        function: 'TIME_SERIES_DAILY',
        symbol: newSymbol,
        output_size: 'compact',
        datatype: 'json',
        apikey: process.env.REACT_APP_ALPHA_VANTAGE_KEY
      }
    };

    try {
      request(options, function (error, response, body) {
        if (error) {
          console.log('Error:', error);
          setErrorMessage('Error:', error);
        } else if(response.statusCode !== 200) {
          console.log('Status:', response.statusCode);
          setErrorMessage('Status:', response.statusCode);
        } else { // run if okay - default condition

          console.log(body);
          console.log(typeof(body)); // answer = string

          let newObject = JSON.parse(body);
          console.log(newObject);
          console.log(typeof(newObject)); // answer = object

          setErrorMessage('');

        }
      });
      return;
    } catch (err) {
      setErrorMessage('No such symbol found!');
      return;
    };
  };

  return (
    <div>
      <section>
        <h2>Stock Quote</h2>
        <h3>From Alpha Vantage</h3>
        <form id='stock-quote' onSubmit={handleSubmit}>
          <input id='stocksymbol' type='text' name='stocksymbol' placeholder='Stock Symbol' />
          <button type='submit'>Submit</button>
        </form>
      </section>
      <section>
        <h3 id='lookup-output'>
          <em>Your Input:</em> {mySymbol}<br />
          <em>Results:</em><br />
          *******************************<br />

          {/*
          {newAnswer.map((answer, index) => {
            return <div key={index}>
              *******************************<br />
              Company Name: {answer.Name}<br />
              Company Symbol: {answer['Symbol']}<br />
              </div>
            })}
            */}
            <span className='output-styling'>{errorMessage}</span>
          </h3>
      </section>
  </div>
  )
}
