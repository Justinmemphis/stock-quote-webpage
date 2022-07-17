import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import ReadRemoteFile from './other_functions/papaparse_csv_file.js'

function App() {
  const [data, setData] = useState(null)
  const [companyname, setCompanyName] = useState(null)

  // this is the test api
  useEffect(() => {
    fetch('/api/')
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, [])

  // this is the company name -> stock symbol lookup
  useEffect(() => {

    // this is the route
    fetch('/api/companyname/')
      .then((res) => res.json())
      .then((companyname) => setCompanyName(companyname))
  }, [])

  return (
    <div>
      <section>
        <form id='company-ticker-lookup' method='post' action='api/companyname'>
          <h3>{"Don't know the stock symbol? Input Stock Company Name Here"}</h3>
          <input id='companyname' type='test' name='companyname' placeholder='Company Name' />
          <input type='submit' value='Submit' />
          <h4>Currently has the NASDAQ 8,438 companies and tickers as of 06/12/2022</h4>
          <h4>US Companies Only</h4>
        </form>
      </section>
      <section>
        <h3>{!companyname ? 'Loading...' : companyname}</h3>
      </section>
      <section>
        <ReadRemoteFile />
      </section>
      <section>
        <h3>Stock Data</h3>
        <h4>From Alpha Vantage</h4>
        <form id='stock-quote' method='post'> {/* also add action='api/stockquote' */}
          <input id='stocksymbol' type='text' name='stocksymbol' placeholder='Stock Symbol' />
          <input type='submit' value='submit' />
        </form>
      </section>
      <section>
        <h3>{!data ? 'Loading...' : data}</h3>
      </section>
    </div>
  );
}

export default App;
