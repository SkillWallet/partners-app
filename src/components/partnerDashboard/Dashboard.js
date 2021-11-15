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

import { connect } from 'react-redux';
import { saveMembers } from '../../redux/Members/members.actions';
import { saveCommunity } from '../../redux/Community/community.actions';

const mapStateToProps = state => {
    return {
      state: state.members,
      community: state.community.community
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        dispatchSaveMembers: (res) => dispatch(saveMembers(res)),
        dispatchSaveCommunity: (res) => dispatch(saveCommunity(res))
    }
  }

const Dashboard = (props) => {
    const [activeView, setActiveView] = useState('landing');
    const [members, setMembers] = useState([]);
    // const [community, setCommunity] = useState({name: '', description: '', image: ''});
    const [roles, setRoles] = useState([]);

    const changeView = (newView) => {
        setActiveView(newView);
    }

    useEffect(async () => {
        let allMembers = [];
        let community = [];
        console.log('useeffect...', props);
        if (props.state.members === null) {
            console.log('checking?');
            allMembers = await getMembers();
            console.log(allMembers);
            props.dispatchSaveMembers(allMembers);
        }
        if (props.community === null) {
            community = await getCommunity();
            props.dispatchSaveCommunity(community)
        }
        console.log(community);
        setMembers(allMembers);
        // setCommunity(community);
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

            {props.community ?                         <div className="card-section">       {/*LOADING SPINNER */}
                            <div className="community-card">
                                <div className="card-header">
                                    <img src={props.community.image} alt="null"/>

                                    <h3><u>{props.community.name}</u></h3>
                                </div>

                                <div className="card-body">
                                    <p>{props.community.description}</p>
                                </div>
                            </div>

                            <button>{props.community.template}</button>
                        </div> : null}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);