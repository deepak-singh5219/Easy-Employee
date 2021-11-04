import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import store from './store/index';
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
