import React from 'react';
import Button from '../Button';

const Dashboard = () => {
    return (
        <div className="dashboard-main">
            <div className="dashboard-sidebar">
                <div className="dashboard-sidebar-design">
                    <div>
                        <img src={null} alt="User avatar" />

                        <h2>Username here</h2>
                    </div>

                    <div className="dashboard-nav">

                        <Button text="Dashboard" src={null} alt="null" dark={false}/>

                        <Button text="Event Factory" src={null} alt="null" dark={false}/>

                        <Button text="DAO Stats" src={null} alt="null" dark={false}/>

                        <Button text="Your Contracts" src={null} alt="null" dark={false}/>
                    </div>

                    <br></br>

                    <Button text="Disconnect" src={null} alt="null"/>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-content-design">
                    <div>
                        <h1>Welcome to your Partner Dashboard</h1>
                        <h2>where your Community happens.</h2>
                    </div>

                    <div className="dashboard-panel">
                        <div>
                            <Button text="Membership IDs" src={null} alt="null" dark={false}/>

                            <Button text="Roles & Skills" src={null} alt="null" dark={false}/>

                            <Button text="Profit-Sharing" src={null} alt="null" dark={false}/>
                        </div>

                        <div>
                            <div>
                                <img src={null} alt="null"/>

                                <h3><u>The DAOist</u></h3>
                            </div>

                            <div>
                                <p>Coordinating Space, Talent and Culture.</p>

                                <p>We want to build a project that doesn't have to win.</p>

                                <p>We are also defined by what we don't do, and that belongs to anyone that's willing to make it theirs.</p>
                            </div>

                            <button>Local Community & DAO</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard;