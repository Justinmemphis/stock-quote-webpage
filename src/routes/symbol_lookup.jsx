import {
  Outlet
} from 'react-router-dom'
import { ParseAndSearch } from '../controllers/parse_and_search'
// import { SearchStockSymbolDatabase } from '../controllers/search_stock_symbol_database'

function SymbolLookup() {
  return (
    <section>
      <h2>Symbol Lookup</h2>
      <ParseAndSearch />
      {/* <SearchStockSymbolDatabase /> */}
      <Outlet />
    </section>
  )
}

export default SymbolLookup
