import React, {useState} from 'react';
import Button from '../Button';
import Members from './Members';
import Roles from './Roles';
import copyIcon from '../../assets/copy-icon.svg';
import logOff from '../../assets/log-off.svg';
import daoStats from '../../assets/dao-stats.svg';
import dashboard from '../../assets/dashboard.svg';
import eventBadge from '../../assets/event-badge.svg';
import avatar from '../../assets/avatar.svg';
import members from '../../assets/member-card.svg';
import roles from '../../assets/roles.svg';
import coins from '../../assets/coins.svg';
// import {Link} from "react-router-dom";

const Dashboard = () => {
    const [activeView, setActiveView] = useState('landing');

    const changeView = (newView) => {
        setActiveView(newView);
    }

    return (
        <div className="dashboard-main">
            <div className="dashboard-sidebar">
                <div className="dashboard-sidebar-design">
                    <div className="dashboard-sidebar-header">
                        <img src={avatar} alt="User avatar" />

                        <h2>Username</h2>
                    </div>

                    <div className="dashboard-nav">

                        <Button text="Dashboard" src={dashboard} alt="null" dark={true}/>

                        <Button text="Event Factory" src={eventBadge} alt="null" dark={false}/>

                        <Button text="DAO Stats" src={daoStats} alt="null" dark={false} disabled={true}/>

                        <Button text="Your Contracts" src={copyIcon} alt="null" dark={false}/>
                    </div>

                    <div className="linebreak" ></div>

                    <Button text="Disconnect" src={logOff} alt="null"/>
                </div>
            </div>

            <div className="dashboard-content">
                {activeView === 'landing' ? <div className="dashboard-content-design">
                    <div>
                        <h1>Welcome to your Partner Dashboard</h1>
                        <h2>where your Community happens.</h2>
                    </div>

                    <div className="dashboard-panel">
                        <div className="dashboard-panel-buttons">
                            {/* <Link to="/members"> */}
                                <Button text="Membership IDs" src={members} alt="null" dark={false} onClick={() => changeView('members')}/>
                            {/* </Link> */}

                            {/* <Link to="/roles"> */}
                                <Button text="Roles & Skills" src={roles} alt="null" dark={false} onClick={() => changeView('roles')}/>
                            {/* </Link> */}

                            <Button text="Profit-Sharing" src={coins} alt="null" dark={false}/>
                        </div>

                        <div className="card-section">
                            <div className="community-card">
                                <div className="card-header">
                                    <img src={avatar} alt="null"/>

                                    <h3><u>The DAOist</u></h3>
                                </div>

                                <div className="card-body">
                                    <p>Coordinating Space, Talent and Culture.</p>

                                    <p>We want to build a project that doesn't have to win.</p>

                                    <p>We are also defined by what we don't do, and that belongs to anyone that's willing to make it theirs.</p>
                                </div>
                            </div>

                            <button>Local Community & DAO</button>
                        </div>
                    </div>
                </div> : activeView === 'members' ? <Members />
                
                    : activeView === 'roles' ? <Roles /> : null}
                
            </div>
        </div>
    )
}

export default Dashboard;