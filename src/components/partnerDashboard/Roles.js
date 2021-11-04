import React from 'react';
import Button from '../Button';

const Roles = () => {
    const changeView = (newView) => {
        // setActiveView(newView);
    }

    return (
        <div className="dashboard-roles-content">
                {/* {activeView === 'landing' ?  */}
                <div className="dashboard-content-design">
                    <div>
                        <h3>Add Skills for each Role, and assign them to your Community Members</h3>
                    </div>

                    <div className="dashboard-panel">
                        <div>
                            {/* <Link to="/members"> */}
                                <Button text="Role 1" src={null} alt="null" dark={false} 
                                // onClick={() => changeView('members')}
                                />
                            {/* </Link> */}

                            {/* <Link to="/roles"> */}
                                <Button text="Role 2" src={null} alt="null" dark={false} 
                                // onClick={() => changeView('roles')}
                                />
                            {/* </Link> */}

                            <Button text="Role 3" src={null} alt="null" dark={false}/>
                        </div>

                        <div>
                            <div>
                                <p>Select up to 4 skills for "Role 1"</p>
                            </div>

                            <button>Confirm & Add Skills</button>
                        </div>
                    </div>
                </div>
                 {/* : activeView === 'members' ? <Members />
                
                    : activeView === 'roles' ? <Roles /> : null} */}
                
            </div>
    );
}

export default Roles;