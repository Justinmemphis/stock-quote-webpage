import React, {
  useEffect,
  useState
} from 'react';
import { usePapaParse } from 'react-papaparse';

export function ParseAndSearch() {
  const { readRemoteFile } = usePapaParse();
  let [data, setData] = useState([]);
  const [finalCompany, setFinalCompany] = useState('');
  const [newAnswer, setNewAnswer] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const url = 'nasdaq_screener_1661027821778_082022.csv';

  useEffect(() => {
    readRemoteFile(url, {
      header: true,
      complete: (results) => {
        console.log('---------------');
        console.log('Results:', results);
        console.log('---------------');
        setData(results.data);
      }
    });
  }, [url, readRemoteFile]);

  console.log('Complete', data.length, 'records');

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let userCompany = formData.get('companyname');
    setFinalCompany(userCompany);
    try {
      let tempAnswer = [];
      tempAnswer = data.filter(company => {
        if (!company.Name) return false;
        if (company.Name.toLowerCase().includes(userCompany.toLowerCase())) return true;
        return false;
      });

      if (!tempAnswer.length) {
        setNewAnswer([]);
        setErrorMessage('No such company found!');
      } else {
        setNewAnswer(tempAnswer);
        setErrorMessage('');
      }

    } catch (err) {
      setNewAnswer([]);
      setErrorMessage('No such company found!');
    }
  };

  return (
    <div>
      <section>
        <h2>Symbol Lookup</h2>
        <h3>Don't Know the Stock Symbol?  Input Stock Company Name Here</h3>
        <form id='stock-quote' onSubmit={handleSubmit}>
          <input id='companyname' type="text" name='companyname' placeholder='Company Name' />
          <button type='submit'>Submit</button>
          <h4>Currently has the NASDAQ 8,308 companies and tickers as of 08/20/22</h4>
          <h4>US Companies (and ADRs) Only</h4>
        </form>
      </section>
      <section>
        <h3 id='lookup-output'>
          <em>Your Input:</em> {finalCompany}<br />
          <em>Results:</em><br />
          *******************************<br />
          {newAnswer.map((answer, index) => {
            return <div key={index}>
              *******************************<br />
              Company Name: {answer.Name}<br />
              Company Symbol: {answer['Symbol']}<br />
              </div>
          })}

          <span className='output-styling'>{errorMessage}</span>
        </h3>
      </section>
    </div>
  )
}
