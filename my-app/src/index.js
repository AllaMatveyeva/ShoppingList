import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { Provider } from 'react-redux'
import { HTMLElementType } from '@mui/utils';

 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <>
    <App/>
    <div style={{width:"200px", order:3}}></div>
    </>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

