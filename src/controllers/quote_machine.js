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

	let cVar = Object.entries(newObject['Time Series (Daily)']); // pull out the main section we want
	//console.log(cVar);

	function formatArray (date) {  // create new array with pairs
		let aVar = date[0];
		let bVar = date[1]['4. close'];
		//console.log('[' + aVar + ', ' + bVar + ']');
		dateArray.push([aVar,bVar]);
	};

	cVar.forEach(formatArray);


	    /*   this is working - keep this section
      Object.entries(newObject['Time Series (Daily)']).forEach(function (date) {
        dateArray.push(date);
      });
      */
      //console.log(dateArray); // all close dates as arrays in pair [date, close value]
      //console.log(dateArray[0]); // first close date
      //console.log(dateArray[0][1]); // nested values of first close date
      //console.log(dateArray[0][1]['4. close']); // first close value
      // let closeNumber = dateArray[0][1]['4. close'].slice(0,-2);
      let closeDate = new Date(dateArray[0][0]);
      setOutputLastClose(dateArray[0][1].slice(0,-2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setOutputLastCloseDate(closeDate.toLocaleDateString('en-us', {weekday: "short", month: "short", day: "numeric", year:"numeric"}));
      setErrorMessage('');

      if (!dateArray) { // stop if no data
        return;
      }

      // d3 section

      // clear out previous graph
      d3.selectAll('svg')
        .remove();




      let margin = {
        top: 30,
        right: 40,
        bottom: 30,
        left: 50
      };
      let width = 500 - margin.left - margin.right;
      let height = 300 - margin.top - margin.bottom;
      
      let parseTime = d3.timeParse('%Y-%m-%d');
      let formatDate = d3.timeFormat('%d-%b'); // "was %B %d, %Y - 'June 30, 2015' etc.
      let bisectDate = d3.bisector(function(d) { return d.date; }).left;
      

	let x = d3.scaleTime().range([0, width]);
	let y = d3.scaleLinear().range([height, 0]);


	/* old

      let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width])
      let y = d3.scaleLinear()
        .range([height, 0]);

	*/

      let svg = d3.select('#chart').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform',
                  'translate(' + margin.left + ',' + margin.top + ')');

	var lineSvg = svg.append('g');
	
	let focus = svg.append('g')
	    .style('display', 'none');
	 

        let data = dateArray;

      
	data.forEach(function(d) {
          d.date = parseTime(d[0]); 
          d.value = +d[1];
        });

      console.log(data);
      console.log(data[0].date);
      console.log(data[0].value);

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.value; })]);

	//      y.domain([0, d3.max(data, function(d) { return d.value; })]);  old

	    /* old
	svg.append('path')
	    .datum(data)
	    .attr('fill', 'none')
	    .attr('stroke', 'red')
	    .attr('stroke-width', 1.5)
	    .attr('d', d3.line()
		    .x(function(d) { return x(d.date) })
		    .y(function(d) { return y(d.value) })
	    )
	    */

	lineSvg.append('path')
	    .data([data])
	    .attr('class', 'line')
	    .attr('fill', 'none')
	    .attr('stroke', 'red')
	    .attr('stroke-width', 1.5)
	    .attr('d', d3.line()
		    .x(function(d) { return x(d.date) })
		    .y(function(d) { return y(d.value) })
	    );
	
      // X axis
      svg.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x))

      // Y axis`
      svg.append('g')
          .call(d3.axisLeft(y))

	// append the x line
	focus.append('line')
	    .attr('class', 'x')
	    .style('stroke', 'blue')
	    .style('stroke-dasharray', '3.3')
	    .style('opacity', 0.5)
	    .attr('y1', 0)
	    .attr('y2', height);

	// append the y line
	focus.append('line')
	    .attr('class', 'y')
	    .style('stroke', 'blue')
	    .style('stroke-dasharray', '3.3')
	    .style('opacity', 0.5)
	    .attr('x1', width)
	    .attr('x2', width);
	
	// append the circle at the intersection
	focus.append('circle')
	    .attr('class', 'y')
	    .style('fill', 'none')
	    .style('stroke', 'blue')
	    .attr('r', 4);

	// place the value at the intersection
	focus.append('text')
	    .attr('class', 'y1')
	    .style('stroke', 'white')
	    .style('stroke-width', '3.5px')
	    .style('opacity', 0.8)
	    .attr('dx', 8)
	    .attr('dy', '-.3em');
	focus.append('text')
	    .attr('class', 'y2')
	    .attr('dx', 8)
	    .attr('dy', '-.3em');

	// place the date at the intersection
	focus.append('text')
	    .attr('class', 'y3')
	    .style('stroke', 'white')
	    .style('stroke-width', '3.5px')
	    .style('opacity', 0.8)
	    .attr('dx', 8)
	    .attr('dy', '1em');
	focus.append('text')
	    .attr('class', 'y4')
	    .attr('dx', 8)
	    .attr('dy', '1em');

	// append the rectangle to capture mouse
	svg.append('rect')
	    .attr('width', width)
	    .attr('height', height)
	    .style('fill', 'none')
	    .style('pointer-events', 'all')
	    .on('mouseover', function() { focus.style('display', null); })
	    .on('mouseout', function() { focus.style('display', 'none'); })
	    .on('mousemove', mousemove);

	function mousemove(event) {
		var testMe = d3.pointer(event,this)[0];
		console.log(testMe);
		var x0 = x.invert(d3.pointer(event,this)[0]);
		var index = bisectDate(data, x0, 1);
		var d0 = data[index - 1];
		var d1 = data[index];
		var d = x0 - d0.date > d1.date - x0 ? d1 : d0;
		
		console.log(x0,index,d0,d1,d);
		focus.select('circle.y')	// this is the circle around the data point
			.attr('transform',
				'translate(' + x(d.date) + ',' + y(d.value) + ')');
		// problem - cannot read property of undefined "date"


		focus.select('text.y1') // text 
			.attr('transform',
				'translate(' + x(d.date) + ',' + y(d.value) + ')')
			.text(d.value);

		focus.select('text.y2') // text
			.attr('transform',
				'translate(' + x(d.date) + ',' + y(d.value) + ')')
			.text(d.value);
	
		focus.select('text.y3') // text
			.attr('transform',
				'translate(' + x(d.date) + ',' + y(d.value) + ')')
			.text(formatDate(d.date));

		focus.select('text.y4') // text
			.attr('transform',
				'translate(' + x(d.date) + ',' + y(d.value) + ')')
			.text(formatDate(d.date));
		
		focus.select('.x') // dotted line
			.attr('transform',
				'translate(' + x(d.date) + ',' + y(d.value) + ')')
			.attr('y2', height - y(d.value));

		focus.select('.y') // dotted line
			.attr('transform',
				'translate(' + width * -1 + ',' + y(d[1]) + ')')
			.attr('x2', width + width);

	}


	/*


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
	    .duration(100)
	    .attr('y', function(d) { return y(d.value); })
	    .attr('height', function(d) { return height - y(d.value); })
	    .delay(function(d,i){console.log(i); return (7000-i) * 0.5; } )

	*/
	
	    /*
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
	*/


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
        <h2>{outputSymbol.toUpperCase()} from 2002 to 2022</h2>
      </section>
  </div>
  )
}
