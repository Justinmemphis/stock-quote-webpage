import React, {
  useEffect,
  useState
} from 'react';
import { usePapaParse } from 'react-papaparse';

export function ReadRemoteFile() {
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
  }, [url]);

  return (
    <div>
        <h1>(Data is loaded)</h1>
    </div>
  )
}
