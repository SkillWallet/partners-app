import React, {useEffect} from 'react';
import Button from '../Button';
import copyIcon from '../../assets/copy-icon.svg';
import logOff from '../../assets/log-off.svg';
import daoStats from '../../assets/dao-stats.svg';
import dashboard from '../../assets/dashboard.svg';
import eventBadge from '../../assets/event-badge.svg';
import avatar from '../../assets/avatar.svg';
import membersCard from '../../assets/member-card.svg';
import rolesImg from '../../assets/roles.svg';
import coins from '../../assets/coins.svg';
import { getMembers, getCommunityByCommunityAddress, fetchData } from '../../contracts/api';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { saveMembers } from '../../redux/Members/members.actions';
import { saveCommunity } from '../../redux/Community/community.actions';

const Dashboard = (props) => {
    useEffect(() => {
        fetchData(props);
    }, [props]);

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
                <div className="dashboard-content-design">
                    <div>
                        <h1>Welcome to your Partner Dashboard</h1>
                        <h2>where your Community happens.</h2>
                    </div>

                    <div className="dashboard-panel">
                        <div className="dashboard-panel-buttons">
                            <Link to={'/analytics/members'}>
                                <Button text="Membership IDs" src={membersCard} alt="null" dark={false} />
                            </Link>

                            <Link to={'/analytics/roles'}>
                                <Button text="Roles & Skills" src={rolesImg} alt="null" dark={false} />
                            </Link>

                            <Button text="Profit-Sharing" src={coins} alt="null" dark={false}/>
                        </div>

                    {props.state.community ?                         
                        <div className="card-section">       {/*LOADING SPINNER */}
                            <div className="community-card">
                                <div className="card-header">
                                    <img src={props.state.community.image} alt="null"/>

                                    <h3><u>{props.state.community.name}</u></h3>
                                </div>

                                <div className="card-body">
                                    <p>{props.state.community.description}</p>
                                </div>
                            </div>

                            <button>{props.state.community.template}</button>
                        </div> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    // console.log('state: ', state);
    return {
      state: {
          members: state.members,
          community: state.community.community
      }
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        dispatchSaveMembers: (res) => dispatch(saveMembers(res)),
        dispatchSaveCommunity: (res) => dispatch(saveCommunity(res))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);