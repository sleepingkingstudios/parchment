import { combineReducers } from 'redux';

import buildFormStore from 'resource/store/form';
import { dig } from 'utils/object';
import buildSubmitClient from './submit';

const generateHooks = ({ formStore, submitClient }) => {
  const {
    useForm,
    useUpdateForm,
  } = formStore.hooks;
  const useSubmitRequest = submitClient.hooks.useRequest;
  const useSubmitStatus = submitClient.hooks.useStatus;

  return {
    useForm,
    useSubmitRequest,
    useSubmitStatus,
    useUpdateForm,
  };
};
const generateReducer = ({ formStore, submitClient }) => {
  const form = formStore.reducer;
  const submit = submitClient.reducer;

  return combineReducers({
    form,
    submit,
  });
};

const buildStore = (options) => {
  const {
    namespace,
  } = options;
  const submitClient = buildSubmitClient({
    ...options,
    namespace: `${namespace}/submit`,
    requestData: state => dig(state, ...namespace.split('/'), 'form', 'data'),
  });
  const formStore = buildFormStore({
    ...options,
    namespace: `${namespace}/form`,
    submitActions: submitClient.actions,
  });

  const hooks = generateHooks({
    formStore,
    submitClient,
  });
  const reducer = generateReducer({
    formStore,
    submitClient,
  });

  return {
    hooks,
    options,
    reducer,
    type: 'resource/create-page/store',
  };
};

export default buildStore;
