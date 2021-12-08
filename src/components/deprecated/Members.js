import React, {useState, useEffect} from 'react';
import avatar from '@assets/avatar.svg';
import copyIcon from '@assets/copy-icon.svg';
import logOff from '@assets/log-off.svg';
import daoStats from '@assets/dao-stats.svg';
import dashboard from '@assets/dashboard.svg';
import eventBadge from '@assets/event-badge.svg';
import Button from '../Button';
import ActivityAndTasks from './ActivityAndTasks';
import { fetchData } from '@contracts/api';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { saveMembers } from '@store/Members/members.actions';
import { saveCommunity } from '@store/Community/community.actions';

const Members = (props) => {    
    const [activeTab, setActiveTab] = useState('role1');
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [role1, setRole1] = useState({roleType: '', members: []});
    const [role2, setRole2] = useState({roleType: '', members: []});
    const [role3, setRole3] = useState({roleType: '', members: []});

    useEffect(() => {
        if (props.state.members && roles.length === 0) {
            const newRoles = Object.keys(props.state.members);

            setRoles(newRoles);
            setRole1({
                roleType: newRoles[0],
                members: props.state.members[newRoles[0]]
            });
            setRole2({
                roleType: newRoles[1],
                members: props.state.members[newRoles[1]]
            });
            setRole3({
                roleType: newRoles[2],
                members: props.state.members[newRoles[2]]
            });

            setIsLoading(false);

        } else if (!props.state.members) {
            fetchData(props);
            setIsLoading(true);
        }
    }, [props.state, roles, role1, role2, role3])

    const changeTab = (newTab) => {
        setActiveTab(newTab);
    }

    const data = {
        activity: {
            maxMembers: 100,
            currentMembers: 10,
            members: [
                {name: "SW 1"},
                {name: "SW 2"},
                {name: "SW 3"},
            ]
        }
    }

    const renderMembers = () => {
        let users = [];
        let components = [];
        
        if (activeTab === 'role1') {
            users = role1.members;
        } else if (activeTab === 'role2') {
            users = role2.members;
        } else {
            users = role3.members;
        }

        if (users) {
        for (let i = 0; i < users.length; i++) {
            components.push(
                   <div className="role-avatar-div" key={i}>
                        <img src={users[i].imageUrl} alt="user avater" />
                        <p>{users[i].nickname}</p>
                   </div>
                   )
        }}
        return components;
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
                        <Link to="/analytics">
                            <Button text="Dashboard" src={dashboard} alt="null" dark={true}/>
                        </Link>

                        <Button text="Event Factory" src={eventBadge} alt="null" dark={false}/>

                        <Button text="DAO Stats" src={daoStats} alt="null" dark={false} disabled={true}/>

                        <Button text="Your Contracts" src={copyIcon} alt="null" dark={false}/>
                    </div>

                    <div className="linebreak" ></div>

                    <Button text="Disconnect" src={logOff} alt="null"/>
                </div>
            </div>
            <div className="members-content">
            {isLoading ? <>'Loading!'</> :
            <>
                    <div className="tabs">
                        <div className={activeTab === 'role1' ? "tab activeTab" : "tab"} onClick={() => changeTab('role1')}>{role1.roleType}</div>
                        <div className={activeTab === 'role2' ? "tab activeTab" : "tab"} onClick={() => changeTab('role2')}>{role2.roleType}</div>
                        <div className={activeTab === 'role3' ? "tab activeTab" : "tab"} onClick={() => changeTab('role3')}>{role3.roleType}</div>
                        <div className={activeTab === 'activity' ? "tab activeTab" : "tab"} onClick={() => changeTab('activity')}>Activity & Logs</div>
                    </div>
        
                    <div className="content-section">
                        {activeTab === 'activity' ? 
                            <ActivityAndTasks data={data['activity']} />
                        : 
                                <div className="role-container">
                                    <div className="role-header">
                                        <h4>{10}/{100}</h4>
                                    </div>
        
                                    <div className="avatar-container">
                                        {renderMembers()}
                                    </div>
        
                                </div> 
                                }
                    </div></>
            }
        </div>
        </div>
    );
}

const mapStateToProps = state => {
    return ({
        state: {
            members: state.members.members
        }
  })};

  const mapDispatchToProps = dispatch => {
    return {
        dispatchSaveMembers: (res) => dispatch(saveMembers(res)),
        dispatchSaveCommunity: (res) => dispatch(saveCommunity(res))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Members);