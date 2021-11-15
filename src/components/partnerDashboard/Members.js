import React, {useState, useEffect} from 'react';
import avatar from '../../assets/avatar.svg';
import ActivityAndTasks from './ActivityAndTasks';

const Members = (props) => {
    const [activeTab, setActiveTab] = useState('role1');
    const [isLoading, setIsLoading] = useState(false);
    const [role1, setRole1] = useState({roleType: '', members: []});
    const [role2, setRole2] = useState({roleType: '', members: []});
    const [role3, setRole3] = useState({roleType: '', members: []});

    useEffect(() => {
        props.location.state.members.length > 0 ? setIsLoading(true) : setIsLoading(false);
        
        const roles = Object.keys(props.location.state.members);

        setRole1({
            roleType: roles[0],
            members: props.location.state.members[roles[0]]
        });

        setRole2({
            roleType: roles[1],
            members: props.location.state.members[roles[1]]
        });

        setRole3({
            roleType: roles[2],
            members: props.location.state.members[roles[2]]
        });
    }, [props.location.state])

    const changeTab = (newTab) => {
        setActiveTab(newTab);
    }

    const data = {
        role1: {
            maxMembers: 57,
            currentMembers: 30,
            members: []
        },
        role2: {
            maxMembers: 29,
            currentMembers: 20,
            members: []
        },
        role3: {
            maxMembers: 14,
            currentMembers: 10,
            members: []
        },
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
                        <img src={users[i].imageUrl} />
                        <p>{users[i].nickname}</p>
                   </div>
                   )
        }}
        return components;
    }

    return (
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
                                        {/* <h4>{data[activeTab].currentMembers}/{data[activeTab].maxMembers}</h4> */}
                                    </div>
        
                                    <div className="avatar-container">
                                        {renderMembers()}
                                    </div>
        
                                </div> 
                                }
                    </div></>
            }
        </div>
    );
}

export default Members;