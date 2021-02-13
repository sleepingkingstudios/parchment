import { combineReducers } from 'redux';

import buildDataStore from 'resource/store/data';
import buildClient from 'resource/store/find';

const generateHooks = ({ dataStore, findClient }) => {
  const { useData } = dataStore.hooks;
  const useDataStatus = findClient.hooks.useStatus;
  const useRequestData = findClient.hooks.usePerformRequest;

  return {
    useData,
    useDataStatus,
    useRequestData,
  };
};
const generateReducer = ({ dataStore, findClient }) => {
  const data = dataStore.reducer;
  const find = findClient.reducer;

  return combineReducers({
    data,
    find,
  });
};

const data = { books: [] };
const namespace = 'origins';
const resourceName = 'origins';
const url = '/api/origins';
const options = {
  namespace,
  resourceName,
  url,
};

const findClient = buildClient({
  ...options,
  namespace: `${namespace}/find`,
});

const { actions } = findClient;
const dataStore = buildDataStore({
  ...options,
  actions,
  data,
  namespace: `${namespace}/data`,
});

export const hooks = generateHooks({
  dataStore,
  findClient,
});

export const reducer = generateReducer({
  dataStore,
  findClient,
});

export default {
  hooks,
  options,
  reducer,
  type: 'origins/store',
};
