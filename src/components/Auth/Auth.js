import React, {useState} from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import {createControls, validate, validateForm} from '../../helpers/helpers';
import Loader from "../UI/Loader/Loader";
import {connect} from "react-redux";
import {authMethod, authValidForm} from '../../store/actions/auth';

const Auth = props => {
  const [formControls, updateFormControls] = useState({
    email: createControls({
      type: "email",
      label: "Email",
      errorMessage: "Введите корректный email",
    },{
      required: true,
      email: true
    }),
    password: createControls({
      type: "password",
      label: "Пароль",
      errorMessage: "Введите корректный пароль",
    },{
      required: true,
      minLength: 6
    })
  });

  const [type, changeType] = useState('login');

  const submitHandler = event => event.preventDefault();

  const loginHandler = () => {
    props.authMethod(
      formControls.email.value,
      formControls.password.value,
      true
    );
  };

  const registerHandler = () => {
    props.authMethod(
      formControls.email.value,
      formControls.password.value,
      false
    );
  };

  const onHandleClick = (event) => {
    const typeTarget = event.target.getAttribute('name');
    if (type === typeTarget) {
      return;
    } else {
      changeType(typeTarget);
    }
  };

  const onchangeHandler = (event, controlName) => {
    const formControlsCopy = {...formControls};
    const control = {...formControlsCopy[controlName]};
    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControlsCopy[controlName] = control;
    props.validForm(validateForm(formControlsCopy));
    updateFormControls(formControlsCopy);
  };

  const renderInputs = () => {
    return  Object.keys(formControls).map((controlName, index) =>{
      const control = formControls[controlName];
      return(
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          label={control.label}
          errorMessage={control.errorMessage}
          valid={control.valid}
          touched={control.touched}
          validation={control.validation}
          shouldValidate={!!control.validation}
          onChange={ event => onchangeHandler(event, controlName)}
        />
      )
    });
  };

  return(
    <div className="auth-bg">
      <form onSubmit={submitHandler}>
        <div className="wrapper-form">
          <h2>Авторизация</h2>
          <p className='wrapper-type-auth'>
            <span className={type === 'login' ? 'type-auth active' : 'type-auth'}
                  name="login"
                  onClick={onHandleClick}>
              Войти
            </span>
            <span className={type === 'register' ? 'type-auth active' : 'type-auth'}
                  name="register"
                  onClick={onHandleClick}>
              Зарегистрироваться
            </span>
          </p>

          {renderInputs()}
          <div className="form-controls">
            {
              type === 'login'
                ? <Button
                    disabled={!props.formValid || props.enableLoader}
                    onClick={loginHandler}
                    text="Войти"
                  />
                : <Button
                    disabled={!props.formValid || props.enableLoader}
                    onClick={registerHandler}
                    text="Зарегистрироваться"
                  />
            }
          </div>
          {props.enableLoader && <Loader/>}
        </div>
      </form>
    </div>
  )
};

const getMapStateToProps = state => {
  return {
    enableLoader: state.authReducer.authEnableLoader,
    formValid: state.authReducer.authFormValid,
  };
};

const getDispatchToProps = dispatch => {
  return {
    authMethod: (email, password, isLogin) => dispatch(authMethod(email, password, isLogin)),
    validForm: (status) => dispatch(authValidForm(status)),
  };
};

export default connect(getMapStateToProps, getDispatchToProps)(Auth)