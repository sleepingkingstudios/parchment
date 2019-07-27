import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import alerts from '../components/alerts/store/reducer';
import createSpell from '../spells/create/store/reducer';
import spells from '../spells/store/reducer';

export const history = createBrowserHistory();

const createReducer = browserHistory => combineReducers({
  router: connectRouter(browserHistory),
  alerts,
  createSpell,
  spells,
});
const store = createStore(
  createReducer(history),
  applyMiddleware(
    thunk,
    routerMiddleware(history),
  ),
);

export default store;
