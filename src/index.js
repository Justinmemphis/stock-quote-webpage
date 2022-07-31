import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import SymbolLookup from './routes/symbol_lookup'
import Quote from './routes/quote'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="symbol_lookup" element={<SymbolLookup />} />
          <Route path="quote" element={<Quote />} />
          <Route index element={
            <main>
              <section>
                <p>Here you can look at stock quotes</p>
              </section>
            </main>
          }
          />
          <Route path="*" element={
            <section>
              <main>
                <p>There's nothing here!</p>
              </main>
            </section>
          }
          />
        </Route>

      </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
