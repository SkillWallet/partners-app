/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';

const Roles = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState('Role 1');
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState(['', '', '']);

  useEffect(() => {
    // if (props.state.community) {
    //   setRoles(props.state.community.roles);
    //   setIsLoading(false);
    // } else {
    //   setIsLoading(true);
    // }
  }, [props.state]);

  const changeRole = (newRole) => {
    setSkills([]);
    setActiveRole(newRole);
  };

  const skillData = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'];

  const addSelectedSkill = (skill) => {
    if (skills.includes(skill)) {
      const newArray = skills.filter((s) => {
        return s !== skill;
      });
      setSkills(newArray);
    } else if (skills.length < 4 && !skills.includes(skill)) {
      setSkills((s) => [...s, skill]);
    } else {
      alert('Please select no more than 4 skills.');
    }
  };

  return (
    <div>Comming soon</div>
    // <div className="dashboard-main">
    //   {isLoading ? (
    //     <div className="item">
    //       <h2>Loading</h2>

    //       <i className="loader two" />
    //     </div>
    //   ) : (
    //     <div />
    //   )}
    //   <div className="dashboard-roles-content">
    //     <div className="dashboard-content-design">
    //       <div>
    //         <h3>Add Skills for each Role, and assign them to your Community Members</h3>
    //       </div>

    //       {!isLoading ? (
    //         <div className="dashboard-panel">
    //           <div className="dashboard-buttons">
    //             <Button
    //               text={roles[0]}
    //               src={false}
    //               alt="null"
    //               dark={activeRole === 'Role 1'}
    //               onClick={() => changeRole('Role 1')}
    //               className={activeRole === 'Role 1' ? 'activeTab' : ''}
    //             />

    //             <Button text={roles[1]} src={false} alt="null" dark={activeRole === 'Role 2'} onClick={() => changeRole('Role 2')} />

    //             <Button text={roles[2]} src={false} alt="null" dark={activeRole === 'Role 3'} onClick={() => changeRole('Role 3')} />
    //           </div>

    //           <div className="skillpicker-container">
    //             <div className="skillpicker">
    //               <div>
    //                 <p>Select up to 4 skills for "{activeRole}"</p>
    //               </div>

    //               <div className="skills-container">
    //                 {skillData.map((skill, i) => {
    //                   return (
    //                     <button
    //                       key={i}
    //                       className={skills.includes(skill) ? 'skillButton activeTab' : 'skillButton'}
    //                       onClick={() => addSelectedSkill(skill)}
    //                     >
    //                       {skill}
    //                     </button>
    //                   );
    //                 })}
    //               </div>
    //             </div>
    //             <button disabled>Confirm & Add Skills</button>
    //           </div>
    //         </div>
    //       ) : null}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Roles;
