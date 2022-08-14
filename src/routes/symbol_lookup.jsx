import {
  Outlet
} from 'react-router-dom'
import { ParseAndSearch } from '../controllers/parse_and_search'

function SymbolLookup() {
  return (
    <div>
      <ParseAndSearch />
      <Outlet />
    </div>
  )
}

export default SymbolLookup
