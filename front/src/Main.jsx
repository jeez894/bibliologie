import React from 'react'
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux"
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import store from "./redux/Store.js"
//import './index.css'
import "./main.css"
import config from '../config';

const root = createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  //</React.StrictMode>
);