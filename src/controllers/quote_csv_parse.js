import {
  React,
  useEffect,
  useState
} from 'react';
import { usePapaParse } from 'react-papaparse';

export function ReadRemoteFile() {
  const url = 'nasdaq_screener_061322.csv';

  const { readRemoteFile } = usePapaParse;
  const [parsedCsvData, setParsedCsvData] = useState([]);

  /* - see link in tracking.md about following this
  useEffect(() => {
    let stillMounted = true;
    readRemoteFile(url, {
      complete: results => {
        if(!stillMounted) return;
        setParsedCsvData(results.data);
      }
    });
    return () => stillMounted = false;
  }, [url]);
  */

  const handleReadRemoteFile = () => {
    readRemoteFile(url, {
      complete: (results) => {
        console.log('----------------------------');
        console.log('Results:', results);
        console.log('----------------------------');
      },
    });
  };

  return <button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>;
}
