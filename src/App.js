import React, {Fragment, useEffect} from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect} from 'react-router-dom'
import CreateTask from "./components/CreateTask/CreateTask";
import Task from "./components/Task/Task";
import TaskList from "./components/TaskList/TaskList";
import Scrum from "./components/Scrum/Scrum";
import Auth from "./components/Auth/Auth";
import {connect} from "react-redux";
import {autoLogin} from "./store/actions/auth";

const App = (props) => {

  useEffect(()=> {
    props.authLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = (
    <Layout>
      <Switch>
        <Route path="/new-task" component={CreateTask} />
        <Route path="/task-list" component={TaskList} />
        <Route path="/task:id" component={Task} />
        <Route path="/scrum" component={Scrum} />
        <Redirect to={'/task-list'}/>
      </Switch>
    </Layout>
  );

  return (
    <Fragment>
      {
        props.isAuth
          ? routes
          : <Auth />
      }
    </Fragment>
  );
};

const getMapStateToProps = state => {
  return {
    isAuth: !! state.authReducer.token
  }
};

const getDispatchToProps = dispatch => {
  return {
    authLogin: () => dispatch(autoLogin())
  }
};

export default connect(getMapStateToProps, getDispatchToProps)(App);
