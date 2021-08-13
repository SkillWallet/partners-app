import './App.css';
import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import logo from './assets/sw-logo.svg';
import {getUsersData} from './contracts/api';
import './Integrate.css';
import networkIcon from "./assets/network.svg";
import analyticsLightIcon from "./assets/analytics.svg";
import analyticsIcon from "./assets/analytics-dark.svg";


function App() {

  const [userData, setUserData] = useState({});
  
  useEffect(async () => {
    await setUserData(getUsersData());
  }, [])
  console.log(userData);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [showQRModal, setShowQRModal] = useState(false);
  const showNewQRModal = () => {
    setShowQRModal(!showQRModal);
};

  return (
    <div className="App">
    <div className="container">
      <main className="landing-main">
        <div className="landing-sidebar">
          <div>
              <h1><b>SkillWallet v.0.1</b></h1>

              <img src={logo} className="logo-img" alt="skillwallet logo"></img>

              <p><b>Welcome, Partner!</b></p>
          </div>
        </div>

        <div className="landing-content">
          <div className="connect-wallet-container">
            <skillwallet-auth 
              id="walletButton"
              className="connect-wallet"
              partner-key="39d395d1549f50bdd864957ca34d93205bc27a50"
            ></skillwallet-auth>
          </div>



          <div className="buttons">
            <div className="buttons-top-row sw-description">
            <p>SkillWallet lets any Community Member create a <b><i>Self-Sovereign NFT ID</i></b>. In 2 easy steps, our Partners can 
            bootstrap a <b>role-based membership</b> with <b><i>Native Governance & On-Chain Analytics</i></b> for their Web3 Community!</p>
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

              <Link to="/analytics">
                <div className="landing-button-container">
                  <div className="landing-button-text">
                      <h2 style={{textDecoration: 'underline', fontWeight: "bold"}}>Analytics</h2>
                      <p>Token Metrics</p>
                  </div>
                  <img src={analyticsIcon} className="landing-button-img" alt="Grey outline of a cylinder"/>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}

export default App;
