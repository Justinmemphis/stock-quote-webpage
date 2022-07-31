import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <section><h1>Stock Quote</h1></section>
      <nav>
          <Link to="/symbol_lookup">Symbol Lookup</Link> | {" "}
          <Link to="/quote">Quote</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
