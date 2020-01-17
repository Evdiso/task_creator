import React, {Component} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import TaskItem from "./TaskItem";

class Column extends Component{
	render() {
		return (

			<div className="wrapper-tasks-list">
				<h3>
					{this.props.column.title}
				</h3>

				<Droppable droppableId={this.props.column.id}>
					{provided=>(
						<div
							className="tasks-list"
							ref={provided.innerRef}
							{...provided.droppableProps}>
							{this.props.tasks.map((task, index) => <TaskItem task={task} index={index} key={task.id} />)}
							{provided.placeholder}
						</div>
						)
					}
				</Droppable>



			</div>
		)
	}
}

export default Column
