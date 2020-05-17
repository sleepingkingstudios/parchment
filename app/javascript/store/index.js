import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducer as alerts } from '../alerts';
import {
  reducer as authentication,
  observer as createAuthTokenObserver,
} from '../authentication';
import { reducer as books } from '../books';
import { reducer as mechanics } from '../mechanics';
import { reducer as spells } from '../spells';

export const history = createBrowserHistory();

const createReducer = browserHistory => combineReducers({
  router: connectRouter(browserHistory),
  alerts,
  authentication,
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

createAuthTokenObserver({ localStorage, store });

export default store;
