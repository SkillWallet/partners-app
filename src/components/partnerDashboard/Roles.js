import React, {useEffect, useState} from 'react';
import Button from '../Button';
import copyIcon from '../../assets/copy-icon.svg';
import logOff from '../../assets/log-off.svg';
import daoStats from '../../assets/dao-stats.svg';
import dashboard from '../../assets/dashboard.svg';
import eventBadge from '../../assets/event-badge.svg';
import avatar from '../../assets/avatar.svg';
import { fetchData } from '../../contracts/api';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { saveMembers } from '../../redux/Members/members.actions';
import { saveCommunity } from '../../redux/Community/community.actions';

const Roles = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeRole, setActiveRole] = useState('Role 1');
    const [skills, setSkills] = useState([]);
    const [roles, setRoles] = useState(['','','']);

    useEffect(() => {
        if (props.state.community) {
            setRoles(props.state.community.roles);
            setIsLoading(false);
        } else {
            fetchData(props);
            setIsLoading(true);
        }
    }, [props.state])


    const changeRole = (newRole) => {
        setSkills([]);
        setActiveRole(newRole);
    }

    const skillData = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'];

    const addSelectedSkill = (skill) => {
        if (skills.includes(skill)) {
            const newArray = skills.filter(s => {
                return s !== skill
            })
            setSkills(newArray);
        } else if (skills.length < 4 && !skills.includes(skill)) {
            setSkills(skills => [...skills, skill]);
        } else {
            alert("Please select no more than 4 skills.")
        }
    }

    return (
        <div className="dashboard-main">
            {isLoading ?
                <div className="item">
                    <h2>Loading</h2>

                    <i className="loader two"></i>
                </div> : <div></div>}
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
            
            <div className="dashboard-roles-content">
                <div className="dashboard-content-design">
                    <div>
                        <h3>Add Skills for each Role, and assign them to your Community Members</h3>
                    </div>

                    {!isLoading ? <div className="dashboard-panel">
                        <div className="dashboard-buttons">
                                <Button text={roles[0]} src={false} alt="null" 
                                dark={activeRole === 'Role 1' ? true : false} 
                                onClick={() => changeRole('Role 1')}
                                className={activeRole === 'Role 1' ? "activeTab" : ""}
                                />

                                <Button text={roles[1]} src={false} alt="null" 
                                dark={activeRole === 'Role 2' ? true : false} 
                                onClick={() => changeRole('Role 2')}
                                />

                            <Button text={roles[2]} src={false} alt="null" 
                            dark={activeRole === 'Role 3' ? true : false} 
                            onClick={() => changeRole('Role 3')}
                            />
                        </div>

                        <div className="skillpicker-container">
                            <div className="skillpicker">
                                <div>
                                    <p>Select up to 4 skills for "{activeRole}"</p>
                                </div>

                                <div className="skills-container">
                                    {skillData.map((skill, i) => {
                                        return (
                                            <button
                                                key={i} 
                                                className={skills.includes(skill) ? "skillButton activeTab" : "skillButton"} 
                                                onClick={() => addSelectedSkill(skill)}>{skill}
                                            </button>)
                                    })}
                                </div>

                            </div>
                            <button disabled={true} >Confirm & Add Skills</button>
                        </div>
                    </div> : null}
                </div>               
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return ({
    state: {
        community: state.community.community,
        members: state.members.members
    }
  })};

  const mapDispatchToProps = dispatch => {
    return {
        dispatchSaveMembers: (res) => dispatch(saveMembers(res)),
        dispatchSaveCommunity: (res) => dispatch(saveCommunity(res))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Roles);