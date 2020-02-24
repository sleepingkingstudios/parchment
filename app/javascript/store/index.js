import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import alerts from '../components/alerts/store/reducer';
import { reducer as books } from '../books';
import { reducer as mechanics } from '../mechanics';
import { reducer as spells } from '../spells';

export const history = createBrowserHistory();

const createReducer = browserHistory => combineReducers({
  router: connectRouter(browserHistory),
  alerts,
  books,
  mechanics,
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
