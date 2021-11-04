import React from 'react';
import '../styles/App.css';

const Button = (props) => {
    return (
        <button className={props.dark ? "partners-button partners-button-dark" : "partners-button partners-button-light"}>
            <img src={props.src} alt={props.alt}/>
            <p>{props.text}</p>
        </button>
    );
}

export default Button;