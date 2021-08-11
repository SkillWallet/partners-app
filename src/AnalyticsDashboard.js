import React from 'react';
import './Integrate.css';
import roleActivity from './assets/role-activity.svg';
import listedContracts from './assets/listed-contracts.svg';
import addContract from './assets/add-contract.svg';
import logOff from './assets/log-off.svg';
import overviewStats from './assets/overview-stats.svg';
import logo from './assets/sw-logo.svg';
import geometricLine from './assets/geometric-card-line-break.png';
import dPad from './assets/d-pad-logo.png';
import { VictoryChart, VictoryStack, VictoryArea, VictoryTheme } from 'victory';

const AnalyticsDashboard = () => {
    const data = [1, 2, 3, 4, 5, 6, 7].map(() => {
        return [
        { x: 1, y: 2 },
        { x: 2, y: 8 },
        { x: 3, y: 5 },
        { x: 4, y: 6 },
        { x: 5, y: 12 }
      ]
    });

    return (
        <main className="analytics-main">
            <div className="analytics-sidebar">
            <div className="user-header">
                <img src={logo} alt="d-pad logo" width="55" height="40" />
                {/* <h4>{username ? username : "Please sign in..."}</h4> */}
                <h4>Jabyl</h4>
            </div>

            <img className="line-break header-line" src={geometricLine} alt="line"/>

            <div className="profit-sidebar-buttons">
                <div className="pill">
                    <img src={overviewStats} alt="d-pad logo"/>
                    <h4>Overview & Stats</h4>
                </div>

                <div className="pill contracts-pill">
                    <img src={listedContracts} alt="d-pad logo"/>
                    <div className="listed-contracts">
                        <h4>Listed Contracts</h4>
                        <form>
                            <input placeholder="0x..." ></input>

                            <input placeholder="0x..." ></input>

                            <input placeholder="0x..." ></input>
                        </form>
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
                        <select id="chartType" name="chartType">
                            <option value="interactions">Interactions</option>
                            <option value="newUsers">New Users</option>
                            <option value="activeUsers">Active Users</option>
                            <option value="roles">Roles</option>
                        </select>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        animate={{duration: 1000}}
                    >
                        <VictoryStack
                        colorScale={"blue"}
                        >
                        {data.map((data, i) => {
                            return (
                            <VictoryArea
                                key={i}
                                data={data}
                                interpolation={"basis"}
                            />
                            );
                        })}
                        </VictoryStack>
                    </VictoryChart>

                        <div className="chart-buttons-div">
                            <button disabled={true}>Community Checkups</button>
                            <button disabled={true}>Role Activity</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AnalyticsDashboard;