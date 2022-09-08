import React, {
  useState
} from 'react';
// import request from 'request';
import axios from 'axios';
import * as d3 from 'd3';

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
      url: '/quote', // change to /quote
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: newSymbol,
        outputsize: 'full',
        datatype: 'json'
      }
    };

    axios.request(options).then((response) => {
      //console.log(response.data);
      //console.log(typeof(response.data));

      let newObject = response.data;

      let stockSymbol = newObject['Meta Data']['2. Symbol'];
      setOutputSymbol(stockSymbol);

      let dateArray = [];
      Object.entries(newObject['Time Series (Daily)']).forEach(function (date) {
        dateArray.push(date);
      });
      console.log(dateArray); // all close dates as objects with nested values
      //console.log(dateArray[0][0]); // first close date
      //console.log(dateArray[0][1]); // nested values of first close date
      //console.log(dateArray[0][1]['4. close']); // first close value
      setOutputLastClose(dateArray[0][1]['4. close']);
      setOutputLastCloseDate(dateArray[0][0]);
      setErrorMessage('');

      // d3 section

      let margin = {
        top: 30,
        right: 40,
        bottom: 30,
        left: 50
      };

      let width = 500 - margin.left - margin.right;
      let height = 300 - margin.top - margin.bottom;

      let parseTime = d3.timeParse('%Y-%m-%d');

      let x = d3.scaleTime()
        .domain([new Date(2000, 1, 1), new Date ()])
        .range([0, width])
      let y = d3.scaleLinear()
        .range([height, 0]);

      let div = d3.select('#chart').append('div')
          .attr('id', 'tooltip')
          .style('display', 'none');

      let svg = d3.select('#chart').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform',
                  'translate(' + margin.left + ',' + margin.top + ')');

      //console.log(response.data['Time Series (Daily)']);

      let data = dateArray;
      console.log(data);

      data.forEach(function(d) {
        d.date = parseTime(d[0]);
        d.value = +d[1]['4. close'];
      });

      y.domain([0, d3.max(data, function(d) { return d.value; })]);

      svg.selectAll('.bar')
          .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x(d.date); })
          .attr('width', 2)
          .attr('y', function(d) { return y(d.value); })
          .attr('data-date', function(d) { return d.date })
          .attr('data-stock-price', function(d) { return d.value })
          .attr('height', function(d) { return height - y(d.value); })
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseout', mouseout)

      function mouseover(event, d) {
        div
          .style('display', 'inline');
      };

      function mousemove(event, d) {
        div
          .text(d.date + ' Stock Price is: ' + d.value)
          .style('left', (event.x) + 'px')
          .style('top', (event.y) + 'px')
          .attr('data-date', d.date);
      };

      function mouseout(event, d) {
        div.style('display', 'non');
      };

      svg.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x))
          .attr('id', 'x-axis')

      svg.append('g')
          .call(d3.axisLeft(y))
          .attr('id', 'y-axis')

      // end d3 section



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
        <h3>From Alpha Vantage<br />
        Raw (As-Traded) Historical Prices</h3>
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
            <span className='output-styling'>{errorMessage}</span>
          </h3>
      </section>
      <section id="chart">
        <h2>{outputSymbol.toUpperCase()} from 2020 to 2022:</h2>
      </section>
  </div>
  )
}
