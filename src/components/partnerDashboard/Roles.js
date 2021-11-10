import React, {useState} from 'react';
import Button from '../Button';
import { confirmAndAddSkills } from '../../contracts/contracts';

const Roles = () => {
    const [activeRole, setActiveRole] = useState('Role 1');
    const [skills, setSkills] = useState([]);

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

    const handleAddSkills = () => {

    };

    return (
        <div className="dashboard-roles-content">
                <div className="dashboard-content-design">
                    <div>
                        <h3>Add Skills for each Role, and assign them to your Community Members</h3>
                    </div>

                    <div className="dashboard-panel">
                        <div className="dashboard-buttons">
                                <Button text="Role 1" src={null} alt="null" 
                                dark={activeRole === 'Role 1' ? true : false} 
                                onClick={() => changeRole('Role 1')}
                                className={activeRole === 'Role 1' ? "activeTab" : ""}
                                />

                                <Button text="Role 2" src={null} alt="null" 
                                dark={activeRole === 'Role 2' ? true : false} 
                                onClick={() => changeRole('Role 2')}
                                />

                            <Button text="Role 3" src={null} alt="null" 
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
                            <button disabled={true} onClick={() => handleAddSkills()}>Confirm & Add Skills</button>
                        </div>
                    </div>
                </div>                
            </div>
    );
}

export default Roles;