import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from '../reducers';

import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

/* eslint-disable no-underscore-dangle */

const initialState = {};
const middleware = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer(history), initialState, composedEnhancers);

/* eslint-enable */

export default store;
