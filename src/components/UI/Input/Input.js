import React from 'react'

const Input = props => {

  const inputType = props.type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`;
  let inputWrapper = "input-wrapper";

  const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid & shouldValidate && touched
  };

  if (isInvalid(props)) {
    inputWrapper += " invalid"
  }

  return (
    <div className={inputWrapper}>
      <label className="input-label"
        htmlFor={htmlFor}>
        {props.label}
      </label>
      <input type={inputType}
             className="input"
             value={props.value}
             id={htmlFor}
             disabled={props.disabled}
             onChange={props.onChange}
             placeholder={props.placeholder}
      />

      {
        isInvalid(props)
          ? <span className="validate-text">{props.errorMessage || ""}</span>
          : null
      }

    </div>
  )
};

export default Input