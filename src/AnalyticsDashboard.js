import React, {useState, useEffect } from 'react';
import './Integrate.css';
import roleActivity from './assets/role-activity.svg';
import checkups from './assets/checkups-dark.svg';
import checkupsLight from './assets/checkups.svg';
import listedContracts from './assets/listed-contracts.svg';
import addContract from './assets/add-contract.svg';
import logOff from './assets/log-off.svg';
import overviewStats from './assets/overview-stats.svg';
import overviewStatsWhite from './assets/overview-stats-white.svg';
import logo from './assets/sw-logo.svg';
import geometricLine from './assets/geometric-card-line-break.png';
import dPad from './assets/d-pad-logo.png';
import blueChartStroke from './assets/blue-chart-stroke.svg';
import blackChartStroke from './assets/black-chart-stroke.svg';
import Chart from './Chart';

const AnalyticsDashboard = () => {
    return (
        <main className="analytics-main">
            <div className="analytics-sidebar">
            <div className="user-header">
                <img src={logo} alt="d-pad logo" />
                {/* <h4>{username ? username : "Please sign in..."}</h4> */}
                <h4>Jabyl</h4>
            </div>

            <img className="line-break header-line" src={geometricLine} alt="line"/>

            <div className="profit-sidebar-buttons">
                <div className="pill analytics-pill">
                    <img src={overviewStatsWhite} alt="d-pad logo"/>
                    <h4>Analytics</h4>
                </div>

                <div className="pill contracts-pill">
                    <img src={listedContracts} alt="d-pad logo"/>
                    <div className="listed-contracts">
                        <h4>Listed Contracts</h4>
                        {/* <form>
                            <input placeholder="0x..." ></input>

                            <input placeholder="0x..." ></input>

                            <input placeholder="0x..." ></input>
                        </form> */}
                        <div>
                            <p>0x8761345...134</p>
                            <p>0x0981934...357</p>
                        </div>
                    </div>
                </div>

                <div className="pill">
                    <img src={addContract} alt="d-pad logo"/>
                    <h4>Add Contract</h4>
                </div>

                <div className="pill">
                    <img src={logOff} alt="d-pad logo"/>
                    <h4>Log off</h4>
                </div>
            </div>
            </div>
            
            <div className="analytics-content">
                <div className="header-row">
                    <div className="community-div dashboard-container">
                        <img className="logo-img" src={dPad} alt="D Pad logo" />
                        <h2>The Dark Dito</h2>
                        </div>
                    <div className="description-div dashboard-container">The greatest Description you could think of. A story about passion, cooperation, 
                    conflict & chaos - unveiling, word by word, a deeper truth about humankind. The greatest Description you could think
                     of. A story about passion, cooperation, conflict & chaos - unveiling, word by word, a deeper truth about humankind. </div>
                </div>

                <div className="content-row">
                    <div className="metrics-column">
                        <div className="members-div dashboard-container">
                            <div>
                                <p><u>Active Members</u></p>
                                <div>36</div>
                            </div>
                            <div>
                                <p><u>Last updated</u></p> 
                                <div>2021/08/11 16:06</div>
                            </div>
                        </div>
                        
                        <div className="roles-div dashboard-container">
                            <h3><u>Community Roles</u></h3>
                            
                            <div className="community-role-metric">
                                <p>Creator</p>
                                <div className="role-icon"><p>20</p></div>
                            </div>

                            <div className="community-role-metric">
                                <p>Collector</p>
                                <div className="role-icon"><p>2</p></div>
                            </div>

                            <div className="community-role-metric">
                                <p>Curator</p>
                                <div className="role-icon"><p>14</p></div>
                            </div>
                        </div>
                    </div>

                    <div className="chart-div dashboard-container">
                        <div>
                            <div className="chart-nav">
                                <select id="chartType" name="chartType">
                                    <option value="interactions">Interactions</option>
                                    <option value="newUsers">New Users</option>
                                    <option value="activeUsers">Active Users</option>
                                    <option value="roles">Roles</option>
                                </select>

                                <div>
                                    <p>Daily</p>
                                    <p>Weekly</p>
                                    <p>Monthly</p>
                                </div>
                            </div>

                            <Chart />

                            <div className="chart-buttons-div">
                                <button disabled={false}>
                                    <p>Commmunity Checkups</p>
                                    <img src={roleActivity} />
                                    </button>
                                <button disabled={true} className="disabled">
                                    <p>Role Activity</p>
                                    <img src={checkups} />
                                </button>
                            </div>
                        </div>

                        <div className="chart-legend">
                            <div>
                                <img src={blueChartStroke} />
                                <p>0x8761345...134</p>
                            </div>
                            
                            <div>
                                <img src={blackChartStroke} />
                                <p>0x0981934...357</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AnalyticsDashboard;