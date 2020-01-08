import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'uikit/dist/css/uikit.min.css';
import './index.scss';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import {BrowserRouter} from "react-router-dom";
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'
import {firebaseConfig} from './firebase'
import firebase from 'firebase'

firebase.initializeApp(firebaseConfig);

// loads the Icon plugin
UIkit.use(Icons);

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
