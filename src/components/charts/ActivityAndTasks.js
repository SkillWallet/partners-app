/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import avatar from '@assets/avatar.svg';

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
        {props.data.members.map((m, i) => {
          return (
            <div className="activity-row" key={i}>
              <img src={avatar} alt="avatar" />
              <p>{m.name}</p>
              <p>@</p>
              <div className="timestamp">
                <p>16:32</p>
                <p>
                  <u>see transaction</u>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityAndTasks;
