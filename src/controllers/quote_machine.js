import React, {
  useState
} from 'react';
// import request from 'request';
import axios from 'axios';
// import * as d3 from 'd3';

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
      url: 'https://www.alphavantage.co/query', // change to /quote
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: newSymbol,
        output_size: 'compact',
        datatype: 'json',
        apikey: process.env.REACT_APP_ALPHA_VANTAGE_KEY // delete this line - also delete .env file
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

      /*

      let margin = {
        top: 30,
        right: 40,
        bottom: 30,
        left: 50
      };

      let width = 500 - margin.left - margin.right;
      let height = 300 - margin.top - margin.bottom;

      let svg = d3.select('#chart').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform',
                  'translate(' + margin.left + ',' + margin.top + ')');

      d3.json(response.data).then(function(rawdata) {
        let data = rawdata;
        console.log(data);
      })
      */


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
      <section id="chart">
        <h2>{outputSymbol.toUpperCase()} from 2020 to 2022:</h2>
      </section>
  </div>
  )
}
