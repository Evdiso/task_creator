import React, {useState} from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';
import Loader from '../UI/Loader/Loader';
import {createControls, validate, validateForm} from '../../helpers/helpers';
import uniaueId from 'uniqid';
import {connect} from "react-redux";
import {formValid, createTaskMethod} from '../../store/actions/taskList';

const CreateTask = props => {

  const [formInputs, updateFormInputs] = useState({
    text: createControls({
      type: "text",
      label: "Опиание задачи",
      errorMessage: "Обязательное поле для заполнения",
    }, {
      required: true
    })
  });
  const [formSelects, updateFormSelects] = useState({
    priority: {
      label: 'Выберите приоритет для задачи',
      value: 1,
      options: [
        {value: 1, text: 'Высокий'},
        {value: 2, text: 'Средний'},
        {value: 3, text: 'Низкий'},
      ],
    }
  });

  const submitHandler = event => {
    event.preventDefault();
  };

  const addTask = () => {
    const formInputsCopy = {...formInputs};
    const formSelectCopy = {...formSelects};

    let task = {
      id: uniaueId(),
      createdDate: new Date().getTime(),
      changesDate: new Date().getTime(),
      status: 1
    };
    for (let input in formInputs) {
      task[input] = formInputsCopy[input].value
    }
    for (let select in formSelects) {
      task[select] = formSelectCopy[select].value
    }

    props.createTask(task, props.uid);

    for (let input in formInputsCopy) {
      formInputsCopy[input].value = "";
    }
    for (let select in formSelectCopy) {
      formSelectCopy[select].value = "";
    }
    updateFormInputs(formInputsCopy);
    updateFormSelects(formSelectCopy);
  };

  const onchangeHandler = (value, controlName) => {
    const formInputsCopy = {...formInputs};
    const control = {...formInputsCopy[controlName]};

    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formInputsCopy[controlName] = control;
    props.formValidate(validateForm(formInputsCopy));
    updateFormInputs(formInputsCopy)
  };

  const onchangeSelectHandler = (value, controlName) => {
    const formSelectCopy = {...formSelects};
    const select = {...formSelectCopy[controlName]};
    select.value = +value;
    formSelectCopy[controlName] = select;
    updateFormSelects(formSelectCopy);
  };

  const renderInputs = () => {
    return  Object.keys(formInputs).map((controlName, index) =>{
      let control = formInputs[controlName];
      return(
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          label={control.label}
          errorMessage={control.errorMessage}
          disabled={props.enableLoader}
          valid={control.valid}
          touched={control.touched}
          validation={control.validation}
          shouldValidate={!!control.validation}
          onChange={ event => onchangeHandler(event.target.value, controlName)}
        />
      )
    });
  };

  const renderSelects = () => {
    return  Object.keys(formSelects).map((controlName, index) =>{
      const control = formSelects[controlName];
      return(
        <Select
          key={controlName + index}
          value={control.value}
          label={control.label}
          options={control.options}
          disabled={props.enableLoader}
          onChange={ event => onchangeSelectHandler(event.target.value, controlName)}
        />
      )
    });
  };

  return(
    <div className="uk-container">
      <form onSubmit={submitHandler}>
        <div className="wrapper-createTask">
          <h2>Создание задачи</h2>

          {renderInputs()}
          {renderSelects()}

          <div className="form-controls">
            <Button
              disabled={!props.formValid || props.enableLoader}
              onClick={addTask}
              text="Создать задачу"
            />
          </div>
          {props.enableLoader && <Loader/>}
        </div>
      </form>
    </div>
  )
};

const getMapStateToProps = state => {
  return {
    formValid: state.taskListReducer.formValid,
    enableLoader: state.taskListReducer.enableLoader,
    uid: state.authReducer.uid
  }
};

const getDispatchToProps = dispatch => {
  return {
    formValidate: (status) => dispatch(formValid(status)),
    createTask: (task, uid) => dispatch(createTaskMethod(task, uid))
  }
};

export default connect(getMapStateToProps, getDispatchToProps)(CreateTask);
