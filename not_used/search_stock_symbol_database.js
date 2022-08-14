import React, {
  useEffect
} from 'react';
// import { data } from './quote_csv_parse';

export default function SearchStockSymbolDatabase(data) {

  console.log('Pulled in data is: ' + data.results);

  useEffect(() => {
    console.log('useEffect data is: ' + data.results)
  }, [data]);

  const lookupSymbol = () => {
    console.log(data.results);
  };

  return (
    <div>
      <h1>SearchStockSymbolDatabase</h1>
      <button onClick={() => lookupSymbol()}>Lookup Symbol</button>
    </div>
  )
};
