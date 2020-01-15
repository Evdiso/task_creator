import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getTasksMethod, loaderChange, requestTasks} from "../../store/actions/taskList";
import Loader from '../../components/UI/Loader/Loader'
import Chart from "./ChartComponent/Chart";

const Statistic = props => {

	useEffect(()=> {
		props.getTasks(props.uid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const generateArray = (array, type) => {
		let tmpArray = array.map(item => item[type]);
		let count1 = 0, count2 = 0, count3 = 0;
		tmpArray.forEach(item => {
			switch (item) {
				case 1:
					count1++;
					break;
				case 2:
					count2++;
					break;
				case 3:
					count3++;
					break;
				default:
			}
		});
		return [count1, count2, count3]
	};


	const renderStat = () => {

		const labelsStat = ['Новых', 'В процессе', 'Выполненных'];
		const labelsPriority = ['Высокий', 'Средний', 'Низкий'];
		const backgroundColor = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)'];
		const borderColor = ["rgba(255, 255, 255, 1)",'rgba(255, 255, 255, 1)','rgba(255, 255, 255, 1)'];
		let statusData = [];
		let priorityData = [];

		if (props.tasksArray && props.tasksArray.length) {
			const tasksArrayCopy = [...props.tasksArray];

			statusData = generateArray(tasksArrayCopy, 'status');
			priorityData = generateArray(tasksArrayCopy, 'priority');
		}

		return (
			<div className='wrapper-stats'>
				{props.tasksArray && props.tasksArray.length ? <Chart labels={labelsStat}
																															backgroundColor={backgroundColor}
																															borderColor={borderColor}
																															datasetsData={statusData}/> : null}
				{props.tasksArray && props.tasksArray.length ? <Chart labels={labelsPriority}
																															backgroundColor={backgroundColor}
																															borderColor={borderColor}
																															datasetsData={priorityData}/> : null}
			</div>
		)
	};

	return (
		<div className={'uk-container'}>
			<div className="wrapper-createTask">
				<h2>Общая статистика по задачам</h2>
				{
					props.enableLoader
						? <Loader />
						: renderStat()
				}
			</div>
		</div>
	)
};


const getMapStateToProps = state => {
	return {
		uid: state.authReducer.uid,
		tasksArray: state.taskListReducer.tasksArray,
		enableLoader: state.taskListReducer.enableLoader
	}
};

const getDispatchToProps = dispatch => {
	return {
		getTasksStat: (uid)=> dispatch(requestTasks(uid)),
		getTasks: (uid)=> dispatch(getTasksMethod(uid)),
		loaderChange: (status) => dispatch(loaderChange(status))
	}
};

export default connect(getMapStateToProps,getDispatchToProps)(Statistic)
