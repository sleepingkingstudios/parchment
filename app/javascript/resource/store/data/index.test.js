import { useSelector } from 'react-redux';

import buildStore from './index';
import {
  shouldGenerateTheHooks,
  shouldGenerateTheReducer,
} from './testHelpers';

jest.mock('react-redux');

useSelector.mockImplementation(() => null);

describe('resource data buildStore()', () => {
  const REQUEST_SUCCESS = 'test/requestSuccess';
  const actions = { REQUEST_SUCCESS };
  const namespace = 'path/to/widgets';
  const resourceName = 'widgets';
  const defaultOptions = {
    actions,
    namespace,
    resourceName,
  };

  describe('with default options', () => {
    const store = buildStore(defaultOptions);

    describe('hooks', () => {
      const { hooks } = store;

      shouldGenerateTheHooks({
        hooks,
        namespace,
        useSelector,
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(store.options).toEqual(defaultOptions);
      });
    });

    describe('reducer', () => {
      const data = { widgets: [] };
      const { reducer } = store;

      shouldGenerateTheReducer({
        actions,
        data,
        reducer,
      });
    });

    describe('type', () => {
      it('should be resource/store/data', () => {
        expect(store.type).toEqual('resources/store/data');
      });
    });
  });

  describe('with data: value', () => {
    const data = { factories: [], widgets: [] };
    const store = buildStore({ ...defaultOptions, data });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(store.options).toEqual({ ...defaultOptions, data });
      });
    });

    describe('reducer', () => {
      const { reducer } = store;

      shouldGenerateTheReducer({
        actions,
        data,
        reducer,
      });
    });
  });
});
