import { combineReducers } from 'redux';

import { hooks as findHooks, reducer as find } from './find';

const useRequestData = findHooks.usePerformRequest;

export const hooks = {
  useRequestData,
};

export const reducer = combineReducers({
  find,
});
