import React from 'react';

const Button = props => {
  return (
    <button className="btn"
            disabled={props.disabled}
            onClick={props.onClick}>
      {props.text}
    </button>
  )
};

export default Button