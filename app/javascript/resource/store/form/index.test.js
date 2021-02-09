import {
  useDispatch,
  useSelector,
} from 'react-redux';

import generateActions from './actions';
import buildStore from './index';
import {
  shouldGenerateTheHooks,
  shouldGenerateTheReducer,
} from './testHelpers';

jest.mock('react-redux');

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(() => null);

describe('resource form buildStore()', () => {
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
  const actions = generateActions({ namespace });
  const defaultOptions = {
    namespace,
    resourceName,
    submitActions,
  };

  describe('with default options', () => {
    const store = buildStore(defaultOptions);

    describe('hooks', () => {
      const { hooks } = store;

      shouldGenerateTheHooks({
        actions,
        hooks,
        namespace,
        useDispatch,
        useSelector,
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(store.options).toEqual(defaultOptions);
      });
    });

    describe('reducer', () => {
      const { reducer } = store;
      const data = { widget: {} };
      const errors = {};

      shouldGenerateTheReducer({
        actions,
        data,
        errors,
        reducer,
        submitActions,
      });
    });

    describe('type', () => {
      it('should be resource/store/form', () => {
        expect(store.type).toEqual('resource/store/form');
      });
    });
  });

  describe('with data: value', () => {
    const data = { factory: {}, widget: {} };
    const store = buildStore({ ...defaultOptions, data });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(store.options).toEqual({ ...defaultOptions, data });
      });
    });

    describe('reducer', () => {
      const { reducer } = store;
      const errors = {};

      shouldGenerateTheReducer({
        actions,
        data,
        errors,
        reducer,
        submitActions,
      });
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
    const store = buildStore({ ...defaultOptions, findActions });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(store.options).toEqual({ ...defaultOptions, findActions });
      });
    });

    describe('reducer', () => {
      const { reducer } = store;
      const data = { widget: {} };
      const errors = {};

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
});
