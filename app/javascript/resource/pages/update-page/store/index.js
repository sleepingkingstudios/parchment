import { combineReducers } from 'redux';

import buildFormStore from 'resource/store/form';
import { dig } from 'utils/object';
import buildFindClient from './find';
import buildSubmitClient from './submit';

const generateHooks = ({ findClient, formStore, submitClient }) => {
  const {
    useForm,
    useUpdateForm,
  } = formStore.hooks;
  const useDataStatus = findClient.hooks.useStatus;
  const useRequestData = findClient.hooks.usePerformRequest;
  const useSubmitRequest = submitClient.hooks.useRequest;
  const useSubmitStatus = submitClient.hooks.useStatus;

  return {
    useDataStatus,
    useForm,
    useRequestData,
    useSubmitRequest,
    useSubmitStatus,
    useUpdateForm,
  };
};
const generateReducer = ({ findClient, formStore, submitClient }) => {
  const find = findClient.reducer;
  const form = formStore.reducer;
  const submit = submitClient.reducer;

  return combineReducers({
    find,
    form,
    submit,
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
    url: `${url}/:id`,
  });
  const submitClient = buildSubmitClient({
    ...options,
    namespace: `${namespace}/submit`,
    requestData: state => dig(state, ...namespace.split('/'), 'form', 'data'),
    url: `${url}/:id`,
  });
  const formStore = buildFormStore({
    ...options,
    findActions: findClient.actions,
    namespace: `${namespace}/form`,
    submitActions: submitClient.actions,
  });

  const hooks = generateHooks({
    findClient,
    formStore,
    submitClient,
  });
  const reducer = generateReducer({
    findClient,
    formStore,
    submitClient,
  });

  return {
    hooks,
    options,
    reducer,
    type: 'resource/update-page/store',
  };
};

export default buildStore;
