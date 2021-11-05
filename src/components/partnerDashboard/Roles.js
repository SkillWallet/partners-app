import React, {useState} from 'react';
import Button from '../Button';

const Roles = () => {
    const [activeRole, setActiveRole] = useState('Role 1');
    const changeRole = (newRole) => {
        setActiveRole(newRole);
    }

    const skillData = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'];

    return (
        <div className="dashboard-roles-content">
                <div className="dashboard-content-design">
                    <div>
                        <h3>Add Skills for each Role, and assign them to your Community Members</h3>
                    </div>

                    <div className="dashboard-panel">
                        <div className="dashboard-buttons">
                            {/* <Link to="/members"> */}
                                <Button text="Role 1" src={null} alt="null" dark={false} 
                                onClick={() => changeRole('Role 1')}
                                />
                            {/* </Link> */}

                            {/* <Link to="/roles"> */}
                                <Button text="Role 2" src={null} alt="null" dark={false} 
                                onClick={() => changeRole('Role 2')}
                                />
                            {/* </Link> */}

                            <Button text="Role 3" src={null} alt="null" dark={false}
                            onClick={() => changeRole('Role 3')}/>
                        </div>

                        <div className="skillpicker-container">
                            <div className="skillpicker">
                                <div>
                                    <p>Select up to 4 skills for "{activeRole}"</p>
                                </div>

                                <div className="skills-container">
                                    {skillData.map((skill, i) => {
                                        return <div
                                        key={i} className="skillButton">{skill}</div>
                                    })}
                                </div>

                            </div>
                            <button disabled={true}>Confirm & Add Skills</button>
                        </div>
                    </div>
                </div>                
            </div>
    );
}

export default Roles;