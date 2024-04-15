import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { persistor, store } from "./Store/Store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <PersistGate  loading={<div>Loading...</div>} persistor={persistor}> 
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </PersistGate>
  </Provider>
)
