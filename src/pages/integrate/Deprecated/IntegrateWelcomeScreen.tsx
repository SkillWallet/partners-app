/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */

import nodes from '@assets/nodes.svg';
import lineBreak from '@assets/geometric-card-line-break.png';
import lightbulb from '@assets/lightbulb.svg';
import logoBlack from '@assets/sw-logo-black.svg';
import graph from '@assets/person-and-graph.svg';
import paper from '@assets/grey-paper.svg';
import importContract from '@assets/import-contract.svg';

const IntegrateWelcomeScreen = (props) => {
  return (
    <div className="welcome-screen">
      <div className="integrate-sidebar">
        <div className="integrate-sidebar-design">
          <div>
            <h2>
              <span>This is your Partner's Agreement!</span>
            </h2>

            <img src={logoBlack} className="new-logo-img" alt="skillwallet logo" />

            <p>
              Here you can automate a role-based Governance for your DAO & integrate a pseudonymous, Sybil-resistant login for your users.
            </p>
          </div>
        </div>
      </div>

      <div className="integrate-content">
        <div className="integrate-content-design">
          <div className="integrate-wrapper">
            <div className="integrate-header">
              <h2 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Partner&#39;s Agreement</h2>
              <h4>Select the template that best represents your project / protocol.</h4>
            </div>

            <div className="integrate-template-content">
              <>
                <div className="integrate-project-types">
                  <div className="template-card card-white welcome-screen-card" onClick={() => props.setSelectedTemplate(0)}>
                    <div className="top-card">
                      <img className="image-7" src={nodes} alt="cluster of network nodes" />

                      <div className="title-white-card raleway-bold-alto-22px">
                        <h3>Open-Source & DeFi</h3>
                      </div>
                    </div>

                    <div className="description-white-card raleway-normal-alto-18px">
                      For researchers & web3, open-source teams, that innovate in a liberal fashion - for a more sustainable, meritocratic
                      world.
                    </div>

                    <img className="line-26" src={lineBreak} alt="line" />
                    <br />
                  </div>

                  <div className="template-card card-white welcome-screen-card" onClick={() => props.setSelectedTemplate(1)}>
                    <div className="top-card">
                      <img className="image-7" src={lightbulb} alt="white lightbulb over a black background" />

                      <div className="title-white-card raleway-bold-alto-22px">
                        <h3>Art, Events & NFTs</h3>
                      </div>
                    </div>

                    <div className="description-white-card raleway-normal-alto-18px">
                      Art movements, writers & creatives of all kind who use Art & provable ownership for purer forms of human interaction.
                    </div>

                    <img className="line-26" src={lineBreak} alt="line" />
                    <br />
                  </div>

                  <div className="template-card card-white welcome-screen-card" onClick={() => props.setSelectedTemplate(2)}>
                    <div className="top-card">
                      <img className="image-7" src={graph} alt="Person standing next to a bar graph" />

                      <div className="title-white-card raleway-bold-alto-22px">
                        <h3>Local Projects & DAOs</h3>
                      </div>
                    </div>

                    <div className="description-white-card raleway-normal-alto-18px">
                      From support for people in need, to innovative local hubs to get together & create something greater than oneself.
                    </div>

                    <img className="line-26" src={lineBreak} alt="line" />
                    <br />
                  </div>
                </div>
                <div className="bottom-row">
                  <div className="bootstrap-button">
                    <p>Bootstrap your Community Economy</p>
                  </div>

                  <div className="integrate-button-panel">
                    <button className="startFromScratch" disabled>
                      <div>
                        <p>Start from Scratch</p>
                        <img src={paper} alt="white sheet of paper" />
                      </div>
                    </button>

                    <button
                      // onClick={toggleModal}
                      type="button"
                      className="importYourContract"
                      disabled
                    >
                      <div>
                        <p>Import your Contract</p>
                        <img src={importContract} alt="black sheet of paper" />
                      </div>
                    </button>
                  </div>

                  <button className="integrate-deploy deploy-disabled" id="integrate-deploy" type="button" onClick={props.signAndDeploy}>
                    Sign & Deploy 🚀
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrateWelcomeScreen;
