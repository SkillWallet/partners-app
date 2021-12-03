import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { defineCustomElements } from "@skill-wallet/auth/loader";
import Integrate from './Integrate';
import Redirect from './components/Redirect';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/partnerDashboard/Dashboard';
import Members from './components/partnerDashboard/Members';
import Roles from './components/partnerDashboard/Roles';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={App}>
              </Route>
              
              <Route path="/integrate" component={Integrate}>
              </Route>

              <Route path="/redirect" component={Redirect}>
              </Route>

              <ProtectedRoute exact path="/analytics/members" component={Members}>
              </ProtectedRoute>
              
              <ProtectedRoute exact path="/analytics/roles" component={Roles}>
              </ProtectedRoute>

              <ProtectedRoute exact path="/analytics" component={Dashboard}>
              </ProtectedRoute>
            </Switch>
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
defineCustomElements(window);