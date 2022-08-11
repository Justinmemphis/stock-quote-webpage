import {
  Outlet
} from 'react-router-dom'
import { ReadRemoteFile } from '../controllers/quote_csv_parse'
import { SearchStockSymbolDatabase } from '../controllers/search_stock_symbol_database'

function SymbolLookup() {
  return (
    <section>
      <h2>Symbol Lookup</h2>
      <ReadRemoteFile />
      <SearchStockSymbolDatabase />
      <Outlet />
    </section>
  )
}

export default SymbolLookup
