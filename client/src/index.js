import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './app/store'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
//import './index.css';
//import './css/apisys.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import './css/style.css';
import './theme.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
//if (process.env.NODE_ENV === 'production') disableReactDevTools()
