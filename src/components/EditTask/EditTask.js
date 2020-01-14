import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {formValid, getTaskServer, loaderChange, setTask, updateTaskMethod} from "../../store/actions/taskList";
import Button from "../UI/Button/Button";
import Loader from "../UI/Loader/Loader";
import {createControls, validate, validateForm} from "../../helpers/helpers";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";

const EditTask = props => {

	const [formInputsEdit, updateFormInputsEdit] = useState({
		text: createControls({
			type: "text",
			label: "Опиание задачи",
			errorMessage: "Обязательное поле для заполнения",
		}, {
			required: true
		})
	});
	const [formSelectsEdit, updateFormSelectsEdit] = useState({
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

	useEffect(()=> {
		const formInputsEditCopy = {...formInputsEdit};
		const formSelectsEditCopy = {...formSelectsEdit};
		props.getTask(props.uid, props.match.params.id).then((data) => {
			props.setTask(data);
			props.loaderChange(false);
			formInputsEditCopy['text'].value = data.text;
			formSelectsEditCopy['priority'].value = data.priority;
			updateFormInputsEdit(formInputsEditCopy);
			updateFormSelectsEdit(formSelectsEditCopy);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	const onchangeHandler = (value, controlName) => {
		const formInputsEditCopy = {...formInputsEdit};
		const control = {...formInputsEditCopy[controlName]};

		control.value = value;
		control.touched = true;
		control.valid = validate(control.value, control.validation);

		formInputsEditCopy[controlName] = control;
		props.formValidate(validateForm(formInputsEditCopy));
		updateFormInputsEdit(formInputsEditCopy)
	};

	const onchangeSelectHandler = (value, controlName) => {
		const formSelectEditCopy = {...formSelectsEdit};
		const select = {...formSelectEditCopy[controlName]};
		select.value = +value;
		formSelectEditCopy[controlName] = select;
		updateFormSelectsEdit(formSelectEditCopy);
	};


	const renderInputs = () => {
		return  Object.keys(formInputsEdit).map((controlName, index) =>{
			let control = formInputsEdit[controlName];
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
		return  Object.keys(formSelectsEdit).map((controlName, index) =>{
			const control = formSelectsEdit[controlName];
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


	const updateTask = () => {
		const formInputsEditCopy = {...formInputsEdit};
		const formSelectEditCopy = {...formSelectsEdit};

		let task = {...props.currentTask};
		task.changesDate = new Date().getTime();

		for (let input in formInputsEditCopy) {
			task[input] = formInputsEditCopy[input].value
		}
		for (let select in formSelectsEdit) {
			task[select] = formSelectEditCopy[select].value
		}

		props.updateTas(task, props.uid);

		for (let input in formInputsEditCopy) {
			formInputsEditCopy[input].value = "";
		}
		for (let select in formSelectEditCopy) {
			formSelectEditCopy[select].value = "";
		}
		updateFormInputsEdit(formInputsEditCopy);
		updateFormSelectsEdit(formSelectEditCopy);
	};

	return (
		<div className="uk-container">
			<form onSubmit={submitHandler}>
				<div className="wrapper-createTask">
					<h2>Редактирование задачи</h2>

					{!props.enableLoader && renderInputs()}
					{!props.enableLoader && renderSelects()}

					<div className="form-controls">
						<Button
							disabled={!props.formValid || props.enableLoader}
							onClick={updateTask}
							text="Обновить задачу"
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
		enableLoader: state.taskListReducer.enableLoader,
		formValid: state.taskListReducer.formValid,
		currentTask: state.taskListReducer.currentTask,
		uid: state.authReducer.uid
	}
};

const getDispatchToProps = dispatch => {
	return {
		formValidate: (status) => dispatch(formValid(status)),
		loaderChange: (status) => dispatch(loaderChange(status)),
		setTask: (task) => dispatch(setTask(task)),
		getTask: (uid, id) => dispatch(getTaskServer(uid, id)),
		updateTas: (task, uid) => dispatch(updateTaskMethod(task, uid))
	}
};

export default connect(getMapStateToProps,getDispatchToProps)(EditTask)
