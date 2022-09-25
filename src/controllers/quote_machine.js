import React, {
  useState
} from 'react';
import axios from 'axios';
import * as d3 from 'd3';

// AlphaVantage - 5 API requests a minute and 500 requests a day

export function QuoteLookup() {
  const [mySymbol, setMySymbol] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [outputSymbol, setOutputSymbol] = useState('');
  const [outputLastClose, setOutputLastClose] = useState('');
  const [outputLastCloseDate, setOutputLastCloseDate] = useState('');

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
        outputsize: 'full',
        datatype: 'json',
	apikey: process.env.REACT_APP_ALPHA_VANTAGE_KEY
      }
    };

    // deploy steps - delete .env; change url above to /quote, remove apikey above

    axios.request(options).then((response) => {
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
      // let closeNumber = dateArray[0][1]['4. close'].slice(0,-2);
      let closeDate = new Date(dateArray[0][0]);
      setOutputLastClose(dateArray[0][1]['4. close'].slice(0,-2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setOutputLastCloseDate(closeDate.toLocaleDateString('en-us', {weekday: "short", month: "short", day: "numeric", year:"numeric"}));
      setErrorMessage('');

      if (!dateArray) { // stop if no data
        return;
      }

      // d3 section

      // clear out previous graph
      d3.selectAll('svg')
        .remove();

      let data = dateArray;
      console.log(data);

      let parseTime = d3.timeParse('%Y-%m-%d');
      let formatTime = d3.timeFormat('%B %d, %Y'); // 'June 30, 2015' etc.

      data.forEach(function(d) {
        d.date = parseTime(d[0]);
        d.value = +d[1]['4. close'];
      });

      let margin = {
        top: 30,
        right: 40,
        bottom: 30,
        left: 50
      };

      let width = 500 - margin.left - margin.right;
      let height = 300 - margin.top - margin.bottom;



      let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
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

      y.domain([0, d3.max(data, function(d) { return d.value; })]);

      svg.selectAll('.bar')
          .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x(d.date); })
          .attr('width', 2)
          .attr('y', function(d) { return y(0) }) // function(d) { return y(d.value); })
          .attr('data-date', function(d) { return d.date })
          .attr('data-stock-price', function(d) { return d.value })
          .attr('height', function(d) { return height - y(0); }) // function(d) { return height - y(d.value); } 
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseout', mouseout)

     svg.selectAll('rect')
	    .transition()
	    .duration(2)
	    .attr('y', function(d) { return y(d.value); })
	    .attr('height', function(d) { return height - y(d.value); })
	    .delay(function(d,i){console.log(i); return i * 2; } )

      function mouseover(event, d) {
        div
          .style('display', 'inline');
      };

      function mousemove(event, d) {
        div
          .text(formatTime(d.date) + '\n Close Price: $' + d.value)
          .style('left', (event.x) + 'px')
          .style('top', (event.y) + 'px')
          .attr('data-date', d.date);
      };

      function mouseout(event, d) {
        div.style('display', 'none');
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
        <h2>{outputSymbol.toUpperCase()} from 2002 to 2022:</h2>
      </section>
  </div>
  )
}
