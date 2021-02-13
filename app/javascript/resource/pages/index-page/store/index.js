import { combineReducers } from 'redux';

import buildDataStore from 'resource/store/data';
import buildDestroyClient from './destroy';
import buildFindClient from './find';

const generateHooks = ({ dataStore, destroyClient, findClient }) => {
  const { useData } = dataStore.hooks;
  const useDataStatus = findClient.hooks.useStatus;
  const useRequestData = findClient.hooks.usePerformRequest;
  const useDestroyRequest = destroyClient.hooks.useRequest;

  return {
    useData,
    useDataStatus,
    useDestroyRequest,
    useRequestData,
  };
};
const generateReducer = ({ dataStore, destroyClient, findClient }) => {
  const data = dataStore.reducer;
  const destroy = destroyClient.reducer;
  const find = findClient.reducer;

  return combineReducers({
    data,
    destroy,
    find,
  });
};

const buildStore = (options) => {
  const {
    namespace,
    url,
  } = options;
  const findClient = buildFindClient({
    ...options,
    namespace: `${namespace}/find`,
  });
  const {
    actions,
    performRequest,
  } = findClient;

  const destroyClient = buildDestroyClient({
    ...options,
    findRequest: performRequest,
    namespace: `${namespace}/destroy`,
    url: `${url}/:id`,
  });

  const dataStore = buildDataStore({
    ...options,
    actions,
    namespace: `${namespace}/data`,
  });

  const hooks = generateHooks({
    dataStore,
    destroyClient,
    findClient,
  });
  const reducer = generateReducer({
    dataStore,
    destroyClient,
    findClient,
  });

  return {
    hooks,
    options,
    reducer,
    type: 'resource/index-page/store',
  };
};

export default buildStore;
