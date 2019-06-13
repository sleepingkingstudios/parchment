import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import alerts from '../components/alerts/store/reducer';
import spells from '../spells/store/reducer';

const reducer = combineReducers({
  alerts,
  spells,
});
const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
