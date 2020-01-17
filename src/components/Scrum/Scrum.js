import React, {Component} from 'react'
import initialData from './initial-data'
import Column from "./components/Column";
import {DragDropContext} from 'react-beautiful-dnd'

class Scrum extends Component {

  state = initialData;

  onDragStart() {
    console.log('onDragStart')
  }

  onDragUpdate() {
    console.log('onDragUpdate')
  }

  onDragEnd = (result) => {
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTasksId = [...column.tasksIds];
    newTasksId.splice(source.index,1);
    newTasksId.splice(destination.index,0,draggableId);

    const newColumn = {
      ...column,
      tasksIds: newTasksId
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        {
          this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const tasks = column.tasksIds.map((taskId) => this.state.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />
          })
        }
      </DragDropContext>
    )
  }
}

export default Scrum;
