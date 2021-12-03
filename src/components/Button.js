import React from 'react';
import '../styles/App.scss';

const Button = (props) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={props.dark ? 'partners-button partners-button-dark' : 'partners-button partners-button-light'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.src ? <img src={props.src} alt={props.alt} /> : null}
      <p>{props.text}</p>
    </button>
  );
};

export default Button;
