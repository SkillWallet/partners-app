import React from 'react';
import avatar from '../../assets/avatar.svg';

const ActivityAndTasks = (props) => {
    return (
        <div className="activity-content">
            <ul>
                <li>24 h</li>
                <li>1w</li>
                <li>1m</li>
                <li>all</li>
            </ul>

            <div>
                {props.data.members.map(m => {
                    return <div className="activity-row">
                                <img src={avatar} />
                                <p>{m.name}</p>
                                <p>@</p>
                                <div>
                                    16:32
                                </div>
                           </div>
                })}
            </div>
        </div>
    )
}

export default ActivityAndTasks;