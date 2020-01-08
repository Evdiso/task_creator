import React from 'react';
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';
import {logOut} from "../../store/actions/auth";

const Header = props => {
  let history = useHistory();
  let classHeader = 'header';
  let classBtn = 'wrapper-btn';
  let isOpen = props.sidebarActive;
  if (isOpen) {
    classHeader += ' header-active';
    classBtn += ' active'
  }

  const logout = (event) => {
    event.preventDefault();
    props.logOutApp();
    history.push('/auth');
  };

  return(
    <header className={classHeader}>
      <button className={classBtn}
              onClick={props.onActiveSidebarHandler}>
        <span uk-icon="icon: menu; ratio: 2">
        </span>
      </button>
      <div className={'account'}>
        <span className={'user-name'}>
          {props.displayName}
        </span>
        <span uk-icon="icon: user; ratio: 2">
        </span>
        <a href={'/'}
           className={'logOut'}
           onClick={logout}>
          Выйти
        </a>
      </div>
    </header>
  )
};

const getMapStateToProps = state => {
  return {
    displayName: state.authReducer.displayName
  }
};

const getDispatchToProps = dispatch => {
  return {
    logOutApp: () => dispatch(logOut())
  }
};

export default connect(getMapStateToProps, getDispatchToProps)(Header)