import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import spells from '../spells/store/reducer';

const reducer = combineReducers({
  spells,
});
const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
