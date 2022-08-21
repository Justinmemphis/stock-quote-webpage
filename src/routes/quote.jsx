import {
  Outlet
} from 'react-router-dom';
import { QuoteLookup } from '../controllers/quote_machine';

function Quote() {
  return (
    <div>
      <QuoteLookup />
      <Outlet />
    </div>
  )
};

export default Quote;
