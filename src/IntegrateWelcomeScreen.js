import React from 'react';
import logo from './assets/sw-logo.svg';
import nodes from './assets/nodes.svg';
import lineBreak from './assets/geometric-card-line-break.png';
import lightbulb from './assets/lightbulb.svg';
import graph from './assets/person-and-graph.svg';
// import paper from './assets/paper.svg';
import paper from './assets/grey-paper.svg';
import importContract from './assets/import-contract.svg';

const IntegrateWelcomeScreen = (props) => {
    return (
        <>
            <div className="integrate-sidebar">
                <h2>Welcome to your <br></br><span style={{ fontWeight: 'bold' }}> Partner Agreement!</span></h2>

                <img src={logo} className="logo-img" alt="skillwallet logo"></img>

                <p>In just two steps, you will integrate a <b>universal, sybil-resistant login </b>
                    for your users - and automate <b>an internal, mathematically-fair Tokenomics </b>
                    for your community.
                </p>
            </div>

            <div className="integrate-content">
                <div className="integrate-header">
                    <h2 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Partner&#39;s Agreement</h2>
                    <h4>Select the template that best represents your project / protocol.</h4>
                </div>

                <div className="integrate-template-content">
                    <>
                        <div className="integrate-project-types">
                            <div className='template-card card-white' onClick={() => props.setSelectedTemplate(0)}>
                                <div className="top-card">
                                    <img className="image-7" src={nodes} alt="cluster of network nodes"/>

                                    <div className="title-white-card raleway-bold-alto-22px">
                                        <h3>Open-Source & DeFi</h3>
                                    </div>
                                </div>

                                <div className="description-white-card raleway-normal-alto-18px">
                                    For researchers & web3, open-source teams, that innovate in a liberal fashion - for a more sustainable, meritocratic world.
                                </div>

                                <img className="line-26" src={lineBreak} alt="line"/>
                            </div>

                            <div className="template-card card-white" onClick={() => props.setSelectedTemplate(1)}>
                                <div className="top-card">
                                    <img className="image-7" src={lightbulb} alt="white lightbulb over a black background"/>

                                    <div className="title-white-card raleway-bold-alto-22px">
                                        <h3>Art, Events & NFTs</h3>
                                    </div>
                                </div>

                                <div className="description-white-card raleway-normal-alto-18px">
                                    Art movements, writers & creatives of all kind who use Art & provable ownership for purer forms of human interaction.
                                </div>

                                <img className="line-26" src={lineBreak} alt="line"/>
                            </div>

                            <div className="template-card card-white" onClick={() => props.setSelectedTemplate(2)}>
                                <div className="top-card">
                                    <img className="image-7" src={graph} alt="Person standing next to a bar graph"/>

                                    <div className="title-white-card raleway-bold-alto-22px">
                                        <h3>Local Projects & DAOs</h3>
                                    </div>
                                </div>

                                <div className="description-white-card raleway-normal-alto-18px">
                                    From support for people in need, to innovative local hubs to get together & create something greater than oneself.
                                </div>

                                <img className="line-26" src={lineBreak} alt="line"/>
                            </div>
                        </div>
                        <div className="bottom-row">
                            <div className="bootstrap-button">
                                <p>Bootstrap your Community Economy</p>
                            </div>

                            <div className="integrate-button-panel">
                                <button className="disabled">
                                    <div>
                                        <p>Start from Scratch</p>
                                        <img src={paper} alt="white sheet of paper"/>
                                    </div>
                                </button>

                                <button
                                    // onClick={toggleModal} 
                                    type='button'
                                    className="importYourContract">
                                    <div>
                                        <p>Import your Contract</p>
                                        <img src={importContract} alt="black sheet of paper"/>
                                    </div>
                                </button>
                            </div>

                            <button className="integrate-deploy deploy-disabled" id="integrate-deploy" type='button'
                                onClick={props.signAndDeploy}
                            >
                                Sign & Deploy 🚀
                            </button>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default IntegrateWelcomeScreen;