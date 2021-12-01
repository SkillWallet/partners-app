import './styles/App.css';
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import logoBlack from './assets/sw-logo-black.svg';
import './styles/Integrate.css';
import networkIcon from "./assets/network.svg";
import analyticsGreyIcon from "./assets/analytics-grey.svg";
import analyticsIcon from "./assets/analytics-dark.svg";
import { connect } from 'react-redux';
import { isUserAuthenticated } from './redux/Members/members.actions';

function App(props) {
  const [analyticsClass, setAnalyticsClass] = useState('landing-button-container disabled');

  window.addEventListener('onSkillwalletLogin', () => {
    props.dispatchAuthenticateUser(true);
    setAnalyticsClass('landing-button-container');
  });

  return (
    <div className="App">
      <div className="container">
        <main className="landing-main">
          <div className="landing-sidebar">
            <div className="landing-sidebar-design">
              <div className="logo-div">

                  <img src={logoBlack} className="new-logo-img" alt="skillwallet logo"></img>
                  <p><b>Welcome, Partner!</b></p>
                  
              </div>
            </div>
          </div>

          <div className="landing-content">
          <div className="landing-content-design">
            <div className="connect-wallet-container">
              <skillwallet-auth
                  partner-key="e045db0b7868a054e0e75b2013b0fc59f1fbe035">
              </skillwallet-auth>
            </div>


            <div className="buttons" id="landingButtons">
              <div className="buttons-top-row sw-description">
              <h2><b><ul>Do more with your DAO</ul></b></h2>

              <p>SkillWallets are individual NFT IDs that unlock the true potential of Web3 Communities.</p>
              <br /><br />
              <p>Our Partners can bootstrap a role-based membership - with Native Governance & On-Chain Analytics for their DAO.</p>
              </div>

              <div className="buttons-bottom-row">
                <Link to="/integrate">
                  <div className="landing-button-container">
                    <div className="landing-button-text">
                        <h2 style={{textDecoration: 'underline', fontWeight: "bold"}}>Integrate</h2>
                        <p>SkillWallet Auth</p>
                    </div>
                    <img src={networkIcon} className="landing-button-img" alt="4 small circles of network nodes connected together"/>
                  </div>
                </Link>

                <Link to={'/analytics'}>
                  <div className={analyticsClass} >
                    <div className="landing-button-text">
                        <h2 style={{textDecoration: 'underline', fontWeight: "bold"}}>Partners</h2>
                        <p>Analytics</p>
                    </div>
                    <img src={props.state.members.auth ? analyticsIcon : analyticsGreyIcon} className="landing-button-img" alt="Grey outline of a cylinder"/>
                  </div>
                </Link>
              </div>
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    state: {
        members: state.members
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
      dispatchAuthenticateUser: (auth) => dispatch(isUserAuthenticated(auth))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
