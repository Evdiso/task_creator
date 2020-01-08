import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Table from '../TaskList/Table/Table'
import Loader from "../UI/Loader/Loader"
import {connect} from 'react-redux'
import {getTasksMethod, deleteTaskMethod} from '../../store/actions/taskList'

const TaskList = props => {

  useEffect(() => {
    props.getTasks(props.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortHandle = () => {

  };

  const deleteHandle = (task) => {
    let taskArrayCopy = [...props.tasksArray];
    taskArrayCopy = taskArrayCopy.filter(item => item.id !== task.id);
    props.deleteTask(taskArrayCopy, props.uid);
  };

  const editHandle = (task) => {
    console.log('edit');
  };

  const selectPriority = priority => {
    switch (priority) {
      case 1:
        return 'Высокий';
      case 2:
        return 'Средний';
      case 3:
        return 'Низкий';
      default:
        return ""
    }
  };

  const selectStatus = status => {
    switch (status) {
      case 1:
        return 'Новая';
      case 2:
        return 'В работе';
      case 3:
        return 'Выполнено';
      default:
        return ""
    }
  };

  const renderTasks = () => {
    return props.tasksArray.map((task, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{task.text}</td>
          <td>{task.createdDate}</td>
          <td>{task.changesDate}</td>
          <td>
            <span className={'status status-' + task.status}>
              {selectStatus(task.status)}
            </span>
          </td>
          <td>
            <span className={'priority priority-' + task.priority}>
              {selectPriority(task.priority)}
            </span>
          </td>
          <td>
            <div className="uk-inline">
              <div className={'wrapper-dropdown'}>
                <Link to={`/task:${task.guid}`}>
                  <span className={'settings-dropdown'}
                        uk-icon="icon: forward">
                  </span>
                </Link>
                <span className={'settings-dropdown'}
                      onClick={event => editHandle(task)}
                      uk-icon="icon: pencil">
                  </span>
                <span className={'settings-dropdown'}
                      onClick={event => deleteHandle(task)}
                      uk-icon="icon: trash">
                  </span>
              </div>
            </div>
          </td>
        </tr>
      )
    });
  };

  return(
    <div className={'wrapper-task-list uk-container'}>
      <h2>Список задач</h2>
      {
        props.enableLoader
          ? <Loader/>
          : <Table onClick={sortHandle}>
              {renderTasks()}
            </Table>
      }
    </div>
  )
};

const mapStateToProps = state => {
  return {
    tasksArray: state.taskListReducer.tasksArray,
    enableLoader: state.taskListReducer.enableLoader,
    uid: state.authReducer.uid
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getTasks: (uid)=> dispatch(getTasksMethod(uid)),
    deleteTask: (tasks, uid)=> dispatch(deleteTaskMethod(tasks, uid)),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);