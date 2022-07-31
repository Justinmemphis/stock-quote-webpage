import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css';
// import {ReadRemoteFile} from '../controllers/stock_symbol_lookup'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [companyname, setCompanyName] = useState('')
  const [fetchedData, setFetchedData] = useState('')

  // this is the test api
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/api'
      )
      setData(result.data)
    }

    fetchData()
  }, [])

  /*
  // function for posting company name
  async function fetchData() {
    const { data } = await axios.post(
      '/api/companyname',
      companyname
    )
    setFetchedData(data)
  }

  useEffect( () => {
    fetchData()
  }, [])

  const handleSubmit = e => {
    // e.preventDefault()
    fetchData()
  }
  */

  return (
    <div>
      <section>
        <form id='company-ticker-lookup' method='post'> {/* action='api/companyname' */}
          <h3>{"Don't know the stock symbol? Input Stock Company Name Here"}</h3>
        </form>

        <h4>Currently has the NASDAQ 8,438 companies and tickers as of 06/12/2022</h4>
        <h4>US Companies Only</h4>
      </section>
      <section>
        <h3>Stock Data</h3>
        <h4>From Alpha Vantage</h4>
        <form id='stock-quote' method='post'> {/* also add action='api/stockquote' */}
          <input id='stocksymbol' type='text' name='stocksymbol' placeholder='Stock Symbol' />
          <input type='submit' value='Submit' />
        </form>
      </section>
      <section>
        <h3>{!data ? 'Loading...' : data}</h3>
      </section>
    </div>
  );
}

export default App;
