import {AUTH_LOADER, AUTH_VALID, AUTH_ERROR, AUTH_TOKEN, LOGOUT} from "../actions/actionTypes";

const initialState = {
  authEnableLoader: false,
  authError: null,
  authFormValid: false,
  token: null,
  displayName: '',
  uid: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADER:
      return {
        ...state,
        authEnableLoader: action.payload
      };
    case AUTH_VALID:
      return {
        ...state,
        authFormValid: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        authEnableLoader: false,
        authError: action.payload
      };
    case AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
        displayName: action.name,
        uid: action.uid
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        displayName: ''
      };
    default:
      return state
  }
};