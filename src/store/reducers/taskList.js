import {
  TASK_LIST_END, TASK_LIST_ERROR, TASK_LIST_START, SORT_TASKS,
  CREATE_TASK, EDIT_TASK, DELETE_TASK, FORM_VALID, CREATE_TASK_END,
  GET_TASK, LOADER_CHANGE, UPDATE_STATUS_SORT
} from "../actions/actionTypes";

const initialState = {
  tasksArray: [],
  tableHeadCol: [
    {text: '№', enableSort: false, sortable: false, type: 'numb'},
    {text: 'Описание задачи', enableSort: false, sortable: false , type: 'descr'},
    {text: 'Дата создания', enableSort: true, sortable: false , type: 'createdDate'},
    {text: 'Дата обновления', enableSort: true, sortable: false, type: 'changesDate'},
    {text: 'Статус задачи', enableSort: true, sortable: false, type: 'status'},
    {text: 'Приоритет', enableSort: true, sortable: false, type: 'priority'}
   ],
  enableLoader: false,
  error: null,
  formValid: false,
  currentTask: null
};

export default function  taskListReducer(state = initialState, action) {
  switch (action.type) {
    case TASK_LIST_START:
      return {
        ...state,
        enableLoader: true
      };
    case TASK_LIST_END:
      return {
        ...state,
        enableLoader: false,
        tasksArray: action.payload
      };
    case TASK_LIST_ERROR:
      return {
        ...state,
        enableLoader: false,
        error: action.payload
      };
    case CREATE_TASK:
      return {
        ...state,

      };
    case CREATE_TASK_END:
      return {
        ...state,
        enableLoader: false
      };
    case EDIT_TASK:
      return {
        ...state
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksArray: [...action.payload]
      };
    case FORM_VALID:
      return {
        ...state,
        formValid: action.payload
      };
    case GET_TASK:
      return {
        ...state,
        currentTask: action.payload
      };
    case LOADER_CHANGE:
      return {
        ...state,
        enableLoader: action.payload
      };
    case SORT_TASKS:
      return {
        ...state,
        tasksArray: [...action.payload]
      };
    case UPDATE_STATUS_SORT:
      return {
        ...state,
        tableHeadCol: [...action.payload]
      };
    default:
      return state
  }
};