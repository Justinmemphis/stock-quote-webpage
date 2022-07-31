import {
  Outlet
} from 'react-router-dom'
import { ReadRemoteFile } from '../controllers/quote_csv_parse'

function SymbolLookup() {
  return (
    <section>
      <h2>Symbol Lookup</h2>
      <ReadRemoteFile />
      <Outlet />
    </section>
  )
}

export default SymbolLookup
