import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from "@skill-wallet/auth/loader";
import { BrowserRouter } from 'react-router-dom';
import IntegrateWelcomeScreen from './IntegrateWelcomeScreen';
import Integrate from './Integrate';
import AnalyticsDashboard from './AnalyticsDashboard';

ReactDOM.render(
  <React.StrictMode>
    {/* <Integrate /> */}
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <App />
          </Route>
          <Route path="/integrate">
              <Integrate />
          </Route>
          <Route path="/analytics">
              <AnalyticsDashboard />
          </Route>
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
defineCustomElements(window);