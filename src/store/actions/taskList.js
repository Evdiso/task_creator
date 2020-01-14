import {createTaskServer, getTasksServer, deleteTaskServer, getTask, updateTaskServer} from '../../configAPI';
import {TASK_LIST_START, TASK_LIST_END, TASK_LIST_ERROR, FORM_VALID,
  CREATE_TASK_END, DELETE_TASK, GET_TASK, LOADER_CHANGE, SORT_TASKS,
  UPDATE_STATUS_SORT
} from './actionTypes'

export function getTasksMethod(uid) {
 return async dispatch => {
   dispatch(getTaskListStart());
   let taskArrayCopy = [];
   getTasksServer(uid).then(data => {
     Object.keys(data).forEach(item =>{
       data[item].id = item;
       taskArrayCopy.push(data[item])
     });
     dispatch(getTaskListEnd(taskArrayCopy));
   }).catch(e => {
     dispatch(getTaskListError(e));
   });
 }
}

export function getTaskServer (uid, id) {
  return async dispatch => {
    dispatch(loaderChange(true));
    return await getTask(uid, id);
  }
}

export function createTaskMethod(task, uid) {
  return async dispatch => {
    dispatch(getTaskListStart());
    createTaskServer(task, uid).then(data => {
      dispatch(createTaskEnd());
    }).catch((e)=> {
      dispatch(getTaskListError(e));
    });
  }
}

export function updateTaskMethod(task, uid) {
  return async dispatch => {
    dispatch(loaderChange(true));
    updateTaskServer(task, uid).then(data => {
      dispatch(loaderChange(false));
    }).catch((e)=> {
      dispatch(getTaskListError(e));
    });
  }
}

export function deleteTaskMethod(tasks, uid) {
  return async dispatch => {
    dispatch(getTaskListStart());
    deleteTaskServer(tasks, uid).then(data => {
      dispatch(createTaskEnd());
      dispatch(deleteTask(tasks))
    }).catch((e)=> {
      dispatch(getTaskListError(e));
    });
  }
}

export function deleteTask(tasks) {
  return {
    type: DELETE_TASK,
    payload: tasks
  }
}

export function createTaskEnd() {
  return {
    type: CREATE_TASK_END
  }
}

export function getTaskListStart() {
  return {
    type: TASK_LIST_START
  }
}

export function getTaskListEnd(taskArrayCopy) {
  return {
    type: TASK_LIST_END,
    payload: taskArrayCopy
  }
}

export function getTaskListError(error) {
  return {
    type: TASK_LIST_ERROR,
    payload: error
  }
}

export function formValid(status) {
  return {
    type: FORM_VALID,
    payload: status
  }
}

export function setTask(task) {
  return {
    type: GET_TASK,
    payload: task
  }
}

export function loaderChange(status) {
  return {
    type: LOADER_CHANGE,
    payload: status
  }
}

export function sortTask(sort) {
  return {
    type: SORT_TASKS,
    payload: sort
  }
}

export function updateStatusSort(arrayCol) {
  return {
    type: UPDATE_STATUS_SORT,
    payload: arrayCol
  }
}
