import {createTaskServer, getTasksServer, deleteTaskServer} from '../../configAPI';
import {TASK_LIST_START, TASK_LIST_END, TASK_LIST_ERROR, FORM_VALID, CREATE_TASK_END, DELETE_TASK} from './actionTypes'

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
