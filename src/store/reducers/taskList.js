import {
  TASK_LIST_END, TASK_LIST_ERROR, TASK_LIST_START,
  CREATE_TASK, EDIT_TASK, DELETE_TASK, FORM_VALID, CREATE_TASK_END
} from "../actions/actionTypes";

const initialState = {
  tasksArray: [],
  enableLoader: false,
  error: null,
  formValid: false
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
    default:
      return state
  }
};