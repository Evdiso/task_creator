import React from 'react';

const Button = props => {
  return (
    <div className="wrapper-btn">
      <button className="btn"
              disabled={props.disabled}
              onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
};

export default Button