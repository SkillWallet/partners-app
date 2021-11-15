import React, {useEffect, useState} from 'react';
import Button from '../Button';
import Members from './Members';
import Roles from './Roles';
import copyIcon from '../../assets/copy-icon.svg';
import logOff from '../../assets/log-off.svg';
import daoStats from '../../assets/dao-stats.svg';
import dashboard from '../../assets/dashboard.svg';
import eventBadge from '../../assets/event-badge.svg';
import avatar from '../../assets/avatar.svg';
import membersCard from '../../assets/member-card.svg';
import rolesImg from '../../assets/roles.svg';
import coins from '../../assets/coins.svg';
import { getMembers, getCommunity } from '../../contracts/api';
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [activeView, setActiveView] = useState('landing');
    const [members, setMembers] = useState([]);
    const [community, setCommunity] = useState({name: '', description: '', image: ''});
    const [roles, setRoles] = useState([]);

    const changeView = (newView) => {
        setActiveView(newView);
    }

    useEffect(async () => {
        const allMembers = await getMembers();
        const community = await getCommunity();
        console.log(community);
        setMembers(allMembers);
        setCommunity(community);
        setRoles(community.roles);
    }, [])

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
                {/* {activeView === 'landing' ?  */}
                <div className="dashboard-content-design">
                    <div>
                        <h1>Welcome to your Partner Dashboard</h1>
                        <h2>where your Community happens.</h2>
                    </div>

                    <div className="dashboard-panel">
                        <div className="dashboard-panel-buttons">
                            <Link to={{
                                pathname: `/analytics/members`,   
                                state: { members: members}
                                }}>
                                <Button text="Membership IDs" src={membersCard} alt="null" dark={false} 
                                // onClick={() => changeView('members')}
                                />
                            </Link>

                            <Link to={{
                                pathname: `/analytics/roles`,   
                                state: { members: members, roles: roles}
                                }}>
                                <Button text="Roles & Skills" src={rolesImg} alt="null" dark={false} 
                                // onClick={() => changeView('roles')}
                                />
                            </Link>

                            <Button text="Profit-Sharing" src={coins} alt="null" dark={false}/>
                        </div>

                        <div className="card-section">
                            <div className="community-card">
                                <div className="card-header">
                                    <img src={community.image} alt="null"/>

                                    <h3><u>{community.name}</u></h3>
                                </div>

                                <div className="card-body">
                                    <p>{community.description}</p>
                                </div>
                            </div>

                            <button>{community.template}</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard;