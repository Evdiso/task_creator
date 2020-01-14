import React, {useEffect} from 'react'
import {connect} from "react-redux";
import Chart from 'chart.js';
import {loaderChange, requestTasks} from "../../store/actions/taskList";
import Loader from '../../components/UI/Loader/Loader'

const Statistic = props => {

	useEffect(()=> {

		let ctx = document.getElementById('myStatistic-status');
		let ctx2 = document.getElementById('myStatistic-priority');
		let statusArray = [];
		let priorityArray = [];

		props.getTasksStat(props.uid).then(data => {

			if (data) {

				Object.keys(data).forEach(item =>{
					statusArray.push(data[item].status);
					priorityArray.push(data[item].priority);
				});


				const status = new Chart(ctx, {
					type: 'doughnut',
					data: {
						labels: ['Новых', 'В процессе', 'Выполненных'],
						datasets: [{
							data: [4,4,4,4,4],
							backgroundColor: [
								'rgba(255, 99, 132)',
								'rgba(54, 162, 235)',
								'rgba(255, 206, 86)'
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)'
							],
							borderWidth: 3
						}]
					}
				});

				const priority = new Chart(ctx2, {
					type: 'doughnut',
					data: {
						labels: ['Высокий', 'Средний', 'Низкий'],
						datasets: [{
							data: [1,1,1,1,1],
							backgroundColor: [
								'rgba(255, 99, 132)',
								'rgba(54, 162, 235)',
								'rgba(255, 206, 86)'
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)'
							],
							borderWidth: 3
						}]
					},
					options: {

					}
				});

				props.loaderChange(false);
			}
		});
	}, []);

	const renderStat = () => {

		return (
			<div className='wrapper-stats'>
				<div className="stat">
					<canvas id="myStatistic-status"></canvas>
				</div>
				<div className="stat">
					<canvas id="myStatistic-priority"></canvas>
				</div>
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
		enableLoader: state.taskListReducer.enableLoader
	}
};

const getDispatchToProps = dispatch => {
	return {
		getTasksStat: (uid)=> dispatch(requestTasks(uid)),
		loaderChange: (status) => dispatch(loaderChange(status))
	}
};

export default connect(getMapStateToProps,getDispatchToProps)(Statistic)
