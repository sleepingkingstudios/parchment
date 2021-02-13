import generateActions from './actions';
import generateReducer from './reducer';
import { shouldGenerateTheReducer } from './testHelpers';

describe('resource data generateReducer()', () => {
  const REQUEST_FAILURE = 'test/requestFailure';
  const requestFailure = errors => ({
    type: REQUEST_FAILURE,
    payload: { errors },
  });
  const submitActions = {
    REQUEST_FAILURE,
    requestFailure,
  };
  const namespace = 'path/to/widgets';
  const resourceName = 'widgets';
  const singularResourceName = 'widget';
  const actions = generateActions({
    namespace,
  });
  const defaultOptions = {
    actions,
    resourceName,
    singularResourceName,
    submitActions,
  };

  describe('with default options', () => {
    const data = { widget: {} };
    const errors = {};
    const reducer = generateReducer(defaultOptions);

    shouldGenerateTheReducer({
      actions,
      data,
      errors,
      reducer,
      submitActions,
    });
  });

  describe('with data: value', () => {
    const data = { factory: [], widget: {} };
    const errors = {};
    const reducer = generateReducer({
      ...defaultOptions,
      data,
    });

    shouldGenerateTheReducer({
      actions,
      data,
      errors,
      reducer,
      submitActions,
    });
  });

  describe('with errors: value', () => {
    const data = { widget: {} };
    const errors = { purpose: ['is unknown'] };
    const reducer = generateReducer({
      ...defaultOptions,
      errors,
    });

    shouldGenerateTheReducer({
      actions,
      data,
      errors,
      reducer,
      submitActions,
    });
  });

  describe('with findActions: value', () => {
    const REQUEST_SUCCESS = 'test/requestSuccess';
    const requestSuccess = data => ({
      type: REQUEST_SUCCESS,
      payload: { data },
    });
    const findActions = {
      REQUEST_SUCCESS,
      requestSuccess,
    };
    const data = { widget: {} };
    const errors = {};
    const reducer = generateReducer({
      ...defaultOptions,
      findActions,
    });

    shouldGenerateTheReducer({
      actions,
      data,
      errors,
      findActions,
      reducer,
      submitActions,
    });
  });
});
