import generateReducer from './reducer';
import { shouldGenerateTheReducer } from './testHelpers';

describe('resource data generateReducer()', () => {
  const REQUEST_SUCCESS = 'test/requestSuccess';
  const actions = { REQUEST_SUCCESS };
  const resourceName = 'widgets';

  describe('with default options', () => {
    const data = { widgets: [] };
    const reducer = generateReducer({ actions, resourceName });

    shouldGenerateTheReducer({
      actions,
      data,
      reducer,
    });
  });

  describe('with data: value', () => {
    const data = { factories: [], widgets: [] };
    const reducer = generateReducer({ actions, data, resourceName });

    shouldGenerateTheReducer({
      actions,
      data,
      reducer,
    });
  });

  describe('with resourceName: singular string', () => {
    const data = { widget: {} };
    const reducer = generateReducer({ actions, resourceName: 'widget' });

    shouldGenerateTheReducer({
      actions,
      data,
      reducer,
    });
  });
});
