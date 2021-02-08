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
  const resourceName = 'widget';
  const actions = generateActions({
    namespace,
  });

  describe('with default options', () => {
    const data = { widget: {} };
    const errors = {};
    const reducer = generateReducer({
      actions,
      resourceName,
      submitActions,
    });

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
      actions,
      data,
      resourceName,
      submitActions,
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
      actions,
      errors,
      resourceName,
      submitActions,
    });

    shouldGenerateTheReducer({
      actions,
      data,
      errors,
      reducer,
      submitActions,
    });
  });
});
