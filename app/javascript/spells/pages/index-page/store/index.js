import { combineReducers } from 'redux';

import { hooks as dataHooks, reducer as data } from './data';
import { hooks as findHooks, reducer as find } from './find';

const { useData } = dataHooks;
const useRequestData = findHooks.usePerformRequest;

export const hooks = {
  useData,
  useRequestData,
};

export const reducer = combineReducers({
  data,
  find,
});
