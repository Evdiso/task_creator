import React, {Component} from 'react'
import initialData from './initial-data'
import Column from "./components/Column";
import {DragDropContext} from 'react-beautiful-dnd'

class Scrum extends Component {

  state = initialData;

  onDragEnd = (result) => {
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTasksId = [...start.tasksIds];
      newTasksId.splice(source.index,1);
      newTasksId.splice(destination.index,0,draggableId);

      const newColumn = {
        ...start,
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
      return;
    }

    const startTasksIds = [...start.tasksIds];
    startTasksIds.splice(source.index, 1);

    const newStart = {
      ...start,
      tasksIds: startTasksIds
    };

    const finishTasksIds = [...finish.tasksIds];
    finishTasksIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      tasksIds: finishTasksIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  render() {
    return (
      <div className="wrapper-container">
        <DragDropContext
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
      </div>
    )
  }
}

export default Scrum;
