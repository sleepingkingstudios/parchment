import { combineReducers } from 'redux';

import { hooks as dataHooks, reducer as data } from './data';
import { hooks as destroyHooks, reducer as destroy } from './destroy';
import { hooks as findHooks, reducer as find } from './find';

const { useData } = dataHooks;
const useDataStatus = findHooks.useStatus;
const useRequestData = findHooks.usePerformRequest;
const useDestroyRequest = destroyHooks.useRequest;

export const hooks = {
  useData,
  useDataStatus,
  useDestroyRequest,
  useRequestData,
};

export const reducer = combineReducers({
  data,
  destroy,
  find,
});
