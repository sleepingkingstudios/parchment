import { combineReducers } from 'redux';

import { hooks as dataHooks, reducer as data } from './data';
import { hooks as findHooks, reducer as find } from './find';

const { useData } = dataHooks;
const useDataStatus = findHooks.useStatus;
const useRequestData = findHooks.usePerformRequest;

export const hooks = {
  useData,
  useDataStatus,
  useRequestData,
};

export const reducer = combineReducers({
  data,
  find,
});
