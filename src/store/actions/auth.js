import {registerUser, loginUser, updateUser} from '../../configAPI';
import {AUTH_VALID, AUTH_LOADER, AUTH_ERROR, AUTH_TOKEN, LOGOUT} from './actionTypes';

export function authMethod(email, password, isLogin) {
  return async dispatch => {
    const userData = {
      email, password, returnSecureToken:  true
    };
    dispatch(authLoaderUpdate(true));
    if (isLogin) {
      loginUser(userData).then(data => {
        dispatch(authLoaderUpdate(false));
        const expirationDate = new Date( new Date().getTime() + data.stsTokenManager.expirationTime * 1000 );

        localStorage.setItem('token', data.stsTokenManager.accessToken);
        localStorage.setItem('localId', data.uid);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('displayName', data.displayName);

        dispatch(authSuccess(data.stsTokenManager.accessToken, data.displayName, data.uid));
        dispatch(autoLogout(data.stsTokenManager.expirationTime));

      }).catch((e)=> {
        dispatch(authErrorUpdate(e));
      });
    } else {
      registerUser(userData).then(data => {
        dispatch(authLoaderUpdate(false));
        updateUser({displayName: data.email});
      }).catch((e)=> {
        dispatch(authErrorUpdate(e));
      });
    }
  }
}

export function authLoaderUpdate(status) {
  return {
    type: AUTH_LOADER,
    payload: status
  }
}

export function authValidForm(status) {
  return {
    type: AUTH_VALID,
    payload: status
  }
}

export function authErrorUpdate(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function authSuccess(token, name, uid) {
  return {
    type: AUTH_TOKEN,
    payload: token,
    name,
    uid
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(()=>{
      dispatch(logOut())
    }, time * 1000);
  };
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token');
    const displayName = localStorage.getItem('displayName');
    const uid = localStorage.getItem('localId');
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logOut());
      } else {
        dispatch(authSuccess(token, displayName, uid));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
      }
    }
  }
}

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('localId');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('displayName');
  return {
    type: LOGOUT,
  }
}