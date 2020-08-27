import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import {
  reducer as alerts,
  observer as createAlertsObserver,
} from '../alerts';
import {
  reducer as authentication,
  observer as createAuthTokenObserver,
} from '../authentication';
import { reducer as books } from '../books';
import { reducer as mechanics } from '../mechanics';
import { reducer as reference } from '../reference';
import { reducer as spells } from '../spells';

export const history = createBrowserHistory();

const createReducer = browserHistory => combineReducers({
  router: connectRouter(browserHistory),
  alerts,
  authentication,
  books,
  mechanics,
  reference,
  spells,
});
const store = createStore(
  createReducer(history),
  applyMiddleware(
    thunk,
    routerMiddleware(history),
  ),
);

createAlertsObserver({ store });
createAuthTokenObserver({ localStorage, store });

export default store;
