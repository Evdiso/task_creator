import React from 'react'

const Select = props => {

  const htmlFor = `${props.label}-${Math.random()}`;
  let wrapperSelect = "wrapper-select";

  return (
    <div className={wrapperSelect}>
      <label htmlFor={htmlFor}>
        {props.label}
      </label>
      <select id={htmlFor}
              disabled={props.disabled}
              onChange={props.onChange}
              value={props.value}>
        {
          props.options.length &&
          props.options.map((option, index) => {
            return(
              <option value={option.value}
                      key={option.value + index}>
                {option.text}
              </option>
            )
          })
        }
      </select>
    </div>
  )
};

export default Select