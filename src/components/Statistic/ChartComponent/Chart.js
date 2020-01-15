import React, {Component} from 'react'
import ChartLib from 'chart.js'

class Chart extends Component{
	constructor(props) {
		super(props);
		this.chartRef = React.createRef();
	}

	componentDidMount() {
		this.myChart = new ChartLib(this.chartRef.current, {
			type: 'pie',
			data: {
				labels: this.props.labels,
				datasets: [{
					data: this.props.datasetsData,
					backgroundColor: this.props.backgroundColor,
					borderColor: this.props.borderColor,
					borderWidth: 1
				}]
			},
			options: {
				legend: {
					display: true,
					position: 'top',
					labels: {
						fontColor: 'rgb(255, 255, 255)',
						padding: 20
					}
				}
			}
		});
	}

	render() {
		return (
			<div className="stat">
				<canvas ref={this.chartRef}/>
			</div>
		)
	}
}

export default Chart
