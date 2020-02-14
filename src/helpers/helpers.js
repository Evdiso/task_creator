import is from "is_js";

export function createControls (config, validation) {
  return {
    ...config,
    validation,
    value: '',
    valid: !validation,
    touched: false
  }
}

export function validate (value, validation) {
  if (!validation) {
    return true
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== "" && isValid
  }

  if (validation.email) {
    isValid = is.email(value) && isValid
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid
  }

  return isValid
}

export function validateForm(formControls) {
  let isFormValid = true;
  Object.keys(formControls).forEach(name => {
    isFormValid = formControls[name].valid && isFormValid;
  });
  return isFormValid;
}