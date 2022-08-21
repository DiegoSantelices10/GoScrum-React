import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './store/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="GoScrum-React/">
      <Provider store={store}>
        <App />
      </Provider>    
    </BrowserRouter>
  </React.StrictMode>
);
