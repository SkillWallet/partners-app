import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './assets/sw-logo.svg';
import {getUsersData} from './contracts/api';
import './Integrate.css';
import { VictoryChart, VictoryStack, VictoryArea } from 'victory';
import networkIcon from "./assets/network.svg";
import analyticsIcon from "./assets/database-server.svg";


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
          <p>The <b>SkillWallet</b> is a free, truly Ownable, Universal Identity based on Skills, rather than personal data. 
            It uses a new standard for an upgradable, non-transferable NFT (U-NT-NFT) tied to a Community .
          </p>

          <img src={logo} className="logo-img" alt="skillwallet logo"></img>

          <p>SkillWallet makes IDs non-transferable, and non-fungible - to ensure uniqueness, value and sybil-resistancy to each and every Individual. 
            Integrate the SkillWallet & bootstrap a fair, cross-chain economy for your Community.
          </p>
        </div>

        <div className="landing-content">
          <div className="connect-wallet-container">
            <skillwallet-auth 
              id="walletButton"
              className="connect-wallet"
              partner-key="6a918cdf9ae3d32131c779c22ae30290a2e729c3"
            ></skillwallet-auth>
          </div>

          <div className="buttons">
            <div className="buttons-top-row">
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

            {/* <VictoryStack>
                <VictoryArea
                  data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
                />
                <VictoryArea
                  data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
                />
                <VictoryArea
                  data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
                />
            </VictoryStack> */}
    </div>
  );
}

export default App;
