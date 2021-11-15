import React, {useEffect, useState} from 'react';
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
import Members from './components/partnerDashboard/Members';
import Roles from './components/partnerDashboard/Roles';
// import { getMembers, getCommunity } from './contracts/api';

// const [members, setMembers] = useState([]);
// const [community, setCommunity] = useState({name: '', description: '', image: ''});
// const [roles, setRoles] = useState([]);

// useEffect(async () => {
//   const allMembers = await getMembers();
//   const community = await getCommunity();
//   console.log(community);
//   setMembers(allMembers);
//   setCommunity(community);
//   setRoles(community.roles);
// }, [])

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App}>
              {/* <App /> */}
          </Route>
          <Route path="/integrate" component={Integrate}>
          </Route>
          <Route exact path="/analytics/members" 
          component={Members}
          >
              {/* <Members /> */}
          </Route>
          <Route exact path="/analytics/roles" 
          component={Roles}
          >
              {/* <Roles /> */}
          </Route>
          <Route exact path="/analytics"
          component={Dashboard}
          >
              {/* <Dashboard /> */}
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