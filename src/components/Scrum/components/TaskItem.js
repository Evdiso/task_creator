import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

const TaskItem = props => {
	return (
		<Draggable draggableId={props.task.id} index={props.index}>
			{provided => (
				<div className="task-list-item"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{props.task.content}
				</div>
			)}
		</Draggable>
	)
};

export default TaskItem
