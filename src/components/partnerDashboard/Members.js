import React, {useState} from 'react';
import avatar from '../../assets/avatar.svg';
import ActivityAndTasks from './ActivityAndTasks';

const Members = () => {
    const [activeTab, setActiveTab] = useState('role1');

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
        const users = [];
        for (let i = 0; i < data[activeTab].currentMembers; i++) {
            users.push(<div>
                        <img src={avatar} />
                        SW
                   </div>)
        }
        return users;
    }

    return (
        <div className="members-content">
            <div className="tabs">
                <div className="tab" onClick={() => changeTab('role1')}>Role 1</div>
                <div className="tab" onClick={() => changeTab('role2')}>Role 2</div>
                <div className="tab" onClick={() => changeTab('role3')}>Role 3</div>
                <div className="tab" onClick={() => changeTab('activity')}>Activity & Logs</div>
            </div>

            <div className="content-section">
                {activeTab === 'activity' ? 
                    <ActivityAndTasks data={data['activity']} />
                : 
                        <div className="help">
                            <div>
                                <h4>{activeTab}</h4>
                                <h4>{data[activeTab].currentMembers}/{data[activeTab].maxMembers}</h4>
                            </div>

                        <div className="avatar-container">
                            {renderMembers()}
                        </div>

                        </div> }
            </div>
        </div>
    );
}

export default Members;