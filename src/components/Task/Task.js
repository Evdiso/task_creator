import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getTaskServer, loaderChange, setTask} from "../../store/actions/taskList";
import Loader from "../UI/Loader/Loader";
import moment from 'moment';

const Task = props => {

  useEffect(()=> {
    const id = props.match.params.id.replace(':',"");
    props.getTask(props.uid, id).then((data) => {
      props.setTask(data);
      props.loaderChange(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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

  const renderTask = () => {
    const task = {...props.currentTask};
    return (
      <ul className={"task-list-detail"}>
        <li className={"task"}>
          <span>Описание задачи:</span>
          {task.text}
        </li>
        <li className={"task"}>
          <span>Дата создания:</span>
          {moment(task.createdDate).format('DD.MM.YYYY, kk:mm:ss')}
        </li>
        <li className={"task"}>
          <span>Дата обновления:</span>
          {moment(task.changesDate).format('DD.MM.YYYY, kk:mm:ss')}
        </li>
        <li className={"task"}>
          <span>Статус задачи:</span>
          {selectStatus(task.status)}
        </li>
        <li className={"task"}>
          <span>Приоритет:</span>
          {selectPriority(task.priority)}
        </li>
      </ul>
    )
  };

  return(
    <div className={'wrapper-task-list uk-container'}>
      <h2>Подробный просмотр задачи</h2>
      {
        props.enableLoader
          ? <Loader/>
          : renderTask()
      }
    </div>
  )
};

const getMapStateToProps = state => {
  return {
    enableLoader: state.taskListReducer.enableLoader,
    currentTask: state.taskListReducer.currentTask,
    uid: state.authReducer.uid
  }
};

const getDispatchToProps = dispatch => {
  return {
    getTask: (uid, id) => dispatch(getTaskServer(uid, id)),
    setTask: (task) => dispatch(setTask(task)),
    loaderChange: (status) => dispatch(loaderChange(status))
  }
};

export default connect(getMapStateToProps, getDispatchToProps)(Task);
