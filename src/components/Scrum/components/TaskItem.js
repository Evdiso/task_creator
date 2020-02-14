import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

const TaskItem = props => {
	return (
		<Draggable draggableId={props.task.id} index={props.index}>
			{(provided, snapshot) => (
				<div className={snapshot.isDragging ? "task-list-item dragging" : "task-list-item"}
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<div className="iconDrag" {...provided.dragHandleProps}></div>
					{props.task.content}
				</div>
			)}
		</Draggable>
	)
};

export default TaskItem
