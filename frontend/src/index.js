import React from 'react';
import ReactDOM from 'react-dom';
import './config/firebase-config';
import App from './App';
import EmailPasswordAuth from './EmailPasswordAuth';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <EmailPasswordAuth />
  </React.StrictMode>,
  document.getElementById('root')
);

