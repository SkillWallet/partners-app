import React from 'react';
// import Image from 'next/image';

const IntegrateWelcomeScreen = (props) => {
    return (
        <>
            <div className="integrate-sidebar">
                <h2>Welcome to your <br></br><span style={{ fontWeight: 'bold' }}> Partner Agreement!</span></h2>

                {/* <Image src="/d-pad-logo.png" alt="d-pad logo" width="100" height="100"></Image> */}

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
                                    {/* <Image className="image-7" src='/nodes.svg' alt="cluster of network nodes" width="40" height="40" /> */}

                                    <div className="title-white-card raleway-bold-alto-22px">
                                        <h3>Open-Source & DeFi</h3>
                                    </div>
                                </div>

                                <div className="description-white-card raleway-normal-alto-18px">
                                    For researchers & web3, open-source teams, that innovate in a liberal fashion - for a more sustainable, meritocratic world.
                                </div>

                                {/* <Image className="line-26" src='/geometric-card-line-break.png' alt="line" width="40" height="2" /> */}
                            </div>

                            <div className="template-card card-white" onClick={() => props.setSelectedTemplate(1)}>
                                <div className="top-card">
                                    {/* <Image className="image-7" src='/lightbulb.svg' alt="white lightbulb over a black background" width="40" height="40" /> */}

                                    <div className="title-white-card raleway-bold-alto-22px">
                                        <h3>Art, Events & NFTs</h3>
                                    </div>
                                </div>

                                <div className="description-white-card raleway-normal-alto-18px">
                                    Art movements, writers & creatives of all kind who use Art & provable ownership for purer forms of human interaction.
                                </div>

                                {/* <Image className="line-26" src='/geometric-card-line-break.png' alt="line" width="40" height="2" /> */}
                            </div>

                            <div className="template-card card-white" onClick={() => props.setSelectedTemplate(2)}>
                                <div className="top-card">
                                    {/* <Image className="image-7" src='/person-and-graph.svg' alt="Person standing next to a bar graph" width="40" height="40" /> */}

                                    <div className="title-white-card raleway-bold-alto-22px">
                                        <h3>Local Projects & DAOs</h3>
                                    </div>
                                </div>

                                <div className="description-white-card raleway-normal-alto-18px">
                                    From support for people in need, to innovative local hubs to get together & create something greater than oneself.
                                </div>

                                {/* <Image className="line-26" src='/geometric-card-line-break.png' alt="line" width="40" height="2" /> */}
                            </div>
                        </div>
                        <div className="bottom-row">
                            <div className="bootstrap-button">
                                <p>Bootstrap your Community Economy</p>
                            </div>

                            <div className="integrate-button-panel">
                                <button>
                                    <p>Start from Scratch</p>
                                    {/* <Image src='/paper.svg' alt="white sheet of paper" width="40" height="40" /> */}
                                </button>

                                <button
                                    // onClick={toggleModal} 
                                    type='button'
                                    className="importYourContract">
                                    <p>Import your Contract</p>
                                    {/* <Image src='/import-contract.svg' alt="black sheet of paper" width="40" height="40" /> */}
                                </button>
                            </div>

                            <button className="integrate-deploy" id="integrate-deploy" type='button'
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