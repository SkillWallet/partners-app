import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from "@skill-wallet/auth/loader";
import Integrate from './Integrate';
import Dashboard from './components/partnerDashboard/Dashboard';
// import Members from './components/partnerDashboard/Members';
// import Roles from './components/partnerDashboard/Roles';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <App />
          </Route>
          <Route path="/integrate">
              <Integrate />
          </Route>
          <Route path="/analytics">
              <Dashboard />
          </Route>
          {/* <Route path="/analytics/members">
              <Members />
          </Route>
          <Route path="/analytics/roles">
              <Roles />
          </Route> */}
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