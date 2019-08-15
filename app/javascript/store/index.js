import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import alerts from '../components/alerts/store/reducer';
import { reducer as createSpell } from '../spells/create/store/index';
import { reducer as findSpell } from '../spells/show/store/index';
import { reducer as findSpells } from '../spells/store/findSpells/index';
import { reducer as updateSpellFind } from '../spells/update/store/find/index';
import { reducer as updateSpellForm } from '../spells/update/store/form/index';
import spells from '../spells/store/reducer';

export const history = createBrowserHistory();

const createReducer = browserHistory => combineReducers({
  router: connectRouter(browserHistory),
  alerts,
  createSpell,
  findSpell,
  findSpells,
  updateSpellFind,
  updateSpellForm,
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
