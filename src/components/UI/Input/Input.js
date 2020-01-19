import React from 'react'

const Input = props => {

  const inputType = props.type || 'text';
  let inputWrapper = "input-wrapper";

  const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid & shouldValidate && touched
  };

  if (isInvalid(props)) {
    inputWrapper += " invalid"
  }

  return (
    <div className={inputWrapper}>
      <label className="input-label">
        <input type={inputType}
               className="input"
               value={props.value}
               disabled={props.disabled}
               onChange={props.onChange}
               placeholder={props.label}
        />
      </label>
      {
        isInvalid(props)
          ? <span className="validate-text">{props.errorMessage || ""}</span>
          : null
      }

    </div>
  )
};

export default Input