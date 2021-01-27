import { combineReducers } from 'redux';

import { hooks as dataHooks, reducer as data } from './data';
import { hooks as findHooks, reducer as find } from './find';

export const hooks = { ...dataHooks, ...findHooks };

export const reducer = combineReducers({
  data,
  find,
});
