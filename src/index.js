import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import axios from 'axios';
import '@mui/material';
import '@emotion/style' ;

axios.defaults.baseURL = "https://believer.vercel.app/" ;
//axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
