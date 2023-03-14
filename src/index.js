import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { store } from './api/store'
import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

import './config/i18n'
import 'react-toastify/dist/ReactToastify.css'
import './assets/bootstrap.min.css'
import './App.scss'
import App from './App'
import Loader from './components/Loader'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
