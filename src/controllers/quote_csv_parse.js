import React, {
  useEffect,
  useState
} from 'react';
import { usePapaParse } from 'react-papaparse';

export function ReadRemoteFile() {

  const { readRemoteFile } = usePapaParse();

  //const [data, setData] = useState({ [] });
  // const [parsedCsvData, setParsedCsvData] = useState([]);

  /*
  // - see link in tracking.md about following this
  useEffect(() => {
    let stillMounted = true;
    readRemoteFile(url, {
      complete: results => {
        if(!stillMounted) return;
        setParsedCsvData(results.data);
        console.log(results);
      }
    });
    return () => stillMounted = false;
  }, [url]);
  */

  const handleReadRemoteFile = () => {
    const url = 'nasdaq_screener_061322.csv';

    readRemoteFile(url, {
      complete: (results) => {
        console.log('----------------');
        console.log('Results:', results);
        console.log('----------------');
      },
    });
  };


  return (
    <button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>
  )
}
