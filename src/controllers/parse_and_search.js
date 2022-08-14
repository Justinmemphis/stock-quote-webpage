import React, {
  useEffect,
  useState
} from 'react';
import { usePapaParse } from 'react-papaparse';

export function ParseAndSearch() {
  const { readRemoteFile } = usePapaParse();
  const [data, setData] = useState([]);
  const url = 'nasdaq_screener_061322.csv';
  console.log(data);

  useEffect(() => {
    readRemoteFile(url, {
      complete: (results) => {
        console.log('---------------');
        console.log('Results:', results);
        console.log('---------------');
        setData(results.data);
      }
    });
  }, [url, readRemoteFile]);

  console.log('Complete', data.length, 'records');
  console.log('Pulled data is: ' + data);
  const myJsonString = JSON.stringify(data);
  console.log(myJsonString);

  const handleSubmit = event => {
    const formData = new FormData(event.currentTarget);
    const userCompany = formData.get('companyname');
    event.preventDefault();
    console.log(userCompany);
    try {
      console.log('try block');
      let newAnswer = myJsonString.find(x => x.Name.toLowerCase().includes(userCompany.toLowerCase()));
      console.log(newAnswer);

    } catch (err) {
      console.log('Error - catch block');
    }

  };



  return (
    <div>
        <h3>Don't Know the Stock Symbol?  Input Stock Company Name Here</h3>
        <form id='stock-quote' onSubmit={handleSubmit}>
          <input id='companyname' type="text" name='companyname' placeholder='Company Name' />
          <button type='submit'>Submit</button>
          <h4>Currently has the NASDAQ 8,438 companies and tickers as of 06/13/22</h4>
          <h4>US Companies Only</h4>
        </form>
    </div>
  )
}
