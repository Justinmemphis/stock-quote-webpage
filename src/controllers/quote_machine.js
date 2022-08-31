import React, {
  useState
} from 'react';
// import request from 'request';
import axios from 'axios';

// below somewhat copied from: https://www.alphavantage.co/documentation/ and
// https://rapidapi.com/alphavantage/api/alpha-vantage
// 5 API requests a minute and 500 requests a day

export function QuoteLookup() {
  const [mySymbol, setMySymbol] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [outputSymbol, setOutputSymbol] = useState('');
  const [outputLastClose, setOutputLastClose] = useState('');
  const [outputLastCloseDate, setOutputLastCloseDate] = useState('');
  // const [output, setOutput] = useState({});

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let newSymbol = formData.get('stocksymbol');
    setMySymbol(newSymbol);

    const options = {
      method: 'GET',
      url: 'http://localhost:3000/quote',
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: newSymbol,
        output_size: 'compact',
        datatype: 'json',
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      console.log(typeof(response.data));

      let newObject = response.data;

      let stockSymbol = newObject['Meta Data']['2. Symbol'];
      setOutputSymbol(stockSymbol);

      let dateArray = [];
      Object.entries(newObject['Time Series (Daily)']).forEach(function (date) {
        dateArray.push(date);
      });
      console.log(dateArray); // all close dates as objects with nested values
      console.log(dateArray[0][0]); // first close date
      console.log(dateArray[0][1]); // nested values of first close date
      console.log(dateArray[0][1]['4. close']); // first close value
      setOutputLastClose(dateArray[0][1]['4. close']);
      setOutputLastCloseDate(dateArray[0][0]);
      setErrorMessage('');

    }).catch((error) => {
      console.log(error);
      setOutputSymbol('');
      setOutputLastClose('');
      setOutputLastCloseDate('');
      setErrorMessage('No such symbol found!');
    })


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
          Stock Symbol: {outputSymbol.toUpperCase()} <br />
          Last Close Date: {outputLastCloseDate} <br />
          Last Close: ${outputLastClose} <br />
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
