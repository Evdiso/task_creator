import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Table from '../TaskList/Table/Table';
import Loader from "../UI/Loader/Loader";
import moment from 'moment';
import {connect} from 'react-redux';
import {getTasksMethod, deleteTaskMethod, sortTask, updateStatusSort} from '../../store/actions/taskList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit, faFolderOpen} from '@fortawesome/free-solid-svg-icons';

const TaskList = props => {

  useEffect(() => {
    props.getTasks(props.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortableTasks = (sort, index) => {
    let copyArray = [...props.tasksArray];
    let copyTableHeadCol = [...props.tableHeadCol];

    if (copyTableHeadCol[index].sortable) {
      copyTableHeadCol[index].sortable = !copyTableHeadCol[index].sortable;
      props.updateStatusSort(copyTableHeadCol);
      return copyArray.sort((a, b) => a[sort] !== b[sort]? a[sort] > b[sort] ? -1 : 1 : 0);
    } else {
      copyTableHeadCol[index].sortable = !copyTableHeadCol[index].sortable;
      props.updateStatusSort(copyTableHeadCol);
      return copyArray.sort((a, b) => a[sort] !== b[sort]? a[sort] < b[sort] ? -1 : 1 : 0);
    }
  };

  const sortHandle = (sort, index) => {
    switch (sort) {
      case 'createdDate':
        props.sortTask(sortableTasks(sort, index));
        break;
      case 'changesDate':
        props.sortTask(sortableTasks(sort, index));
        break;
      case 'status':
        props.sortTask(sortableTasks(sort, index));
        break;
      case 'priority':
        props.sortTask(sortableTasks(sort, index));
        break;
      default:
        return null
    }
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
          <td>{ moment(task.createdDate).format('DD.MM.YYYY, kk:mm:ss') }</td>
          <td>{ moment(task.changesDate).format('DD.MM.YYYY, kk:mm:ss') }</td>
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
                <Link to={"/task:" + task.id}>
                  <span className={'settings-dropdown'}>
                    <FontAwesomeIcon icon={faFolderOpen} />
                  </span>
                </Link>
                <span className={'settings-dropdown'}
                      onClick={event => editHandle(task)}>
                  <FontAwesomeIcon icon={faEdit} />
                </span>
                <span className={'settings-dropdown'}
                      onClick={event => deleteHandle(task)}>
                   <FontAwesomeIcon icon={faTrashAlt} />
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
          : <Table onClick={ (sort, index) => sortHandle(sort, index)}>
              {renderTasks()}
            </Table>
      }
    </div>
  )
};

const mapStateToProps = state => {
  return {
    tasksArray: state.taskListReducer.tasksArray,
    tableHeadCol: state.taskListReducer.tableHeadCol,
    enableLoader: state.taskListReducer.enableLoader,
    uid: state.authReducer.uid
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getTasks: (uid)=> dispatch(getTasksMethod(uid)),
    deleteTask: (tasks, uid)=> dispatch(deleteTaskMethod(tasks, uid)),
    sortTask: (sort)=> dispatch(sortTask(sort)),
    updateStatusSort: (arrayCol) => dispatch(updateStatusSort(arrayCol))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);