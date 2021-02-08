import generateActions from './actions';
import generateReducer from './reducer';
import { shouldGenerateTheReducer } from './testHelpers';

describe('resource data generateReducer()', () => {
  const namespace = 'path/to/widgets';
  const resourceName = 'widget';
  const actions = generateActions({ namespace });

  describe('with default options', () => {
    const data = { widget: {} };
    const errors = {};
    const reducer = generateReducer({
      actions,
      resourceName,
    });

    shouldGenerateTheReducer({
      actions,
      data,
      errors,
      reducer,
    });
  });

  describe('with data: value', () => {
    const data = { factory: [], widget: {} };
    const errors = {};
    const reducer = generateReducer({
      actions,
      data,
      resourceName,
    });

    shouldGenerateTheReducer({
      actions,
      data,
      errors,
      reducer,
    });
  });

  describe('with errors: value', () => {
    const data = { widget: {} };
    const errors = { widget: { purpose: 'is unknown' } };
    const reducer = generateReducer({
      actions,
      errors,
      resourceName,
    });

    shouldGenerateTheReducer({
      actions,
      data,
      errors,
      reducer,
    });
  });
});
