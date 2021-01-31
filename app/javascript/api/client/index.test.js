import fetch from 'cross-fetch';
import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';

import { PENDING } from 'api/status';
import { underscoreKeys } from 'utils/object';
import buildClient from './index';
import generateInitialState from './initialState';
import {
  shouldGenerateTheActions,
  shouldGenerateTheReducer,
  shouldGenerateTheSelector,
} from './testHelpers';
import {
  shouldHandleTheResponse,
  shouldPerformTheRequest,
} from './request/testHelpers';

jest.mock('cross-fetch');
jest.mock('react');
jest.mock('react-redux');

const dispatch = jest.fn();
const getState = jest.fn();
const store = { getState };

useDispatch.mockImplementation(() => dispatch);
useEffect.mockImplementation(fn => fn());
useSelector.mockImplementation(() => PENDING);
useStore.mockImplementation(() => store);

describe('buildClient()', () => {
  const namespace = 'path/to/widgets';
  const url = 'api/v1/widgets';
  const defaultOptions = { namespace, url };

  beforeEach(() => { fetch.mockClear(); });

  describe('with default options', () => {
    const client = buildClient(defaultOptions);

    describe('actions', () => {
      const { actions } = client;

      shouldGenerateTheActions({
        actions,
        namespace,
      });
    });

    describe('hooks', () => {
      const { hooks } = client;

      describe('usePerformRequest()', () => {
        const { usePerformRequest } = hooks;

        it('should be a function', () => {
          expect(typeof usePerformRequest === 'function').toBe(true);
        });

        it('should return a function', () => {
          expect(typeof usePerformRequest() === 'function').toBe(true);
        });
      });

      describe('useStatus()', () => {
        const { useStatus } = hooks;

        it('should be a function', () => {
          expect(typeof useStatus === 'function').toBe(true);
        });

        it('should delegate to useSelector', () => {
          expect(useStatus()).toEqual(PENDING);
        });
      });
    });

    describe('method', () => {
      it('should return the method', () => {
        expect(client.method).toEqual('GET');
      });
    });

    describe('middleware', () => {
      it('should return an empty array', () => {
        expect(client.middleware).toEqual([]);
      });
    });

    describe('namespace', () => {
      it('should return the namespace', () => {
        expect(client.namespace).toEqual(namespace);
      });
    });

    describe('performRequest()', () => {
      const { actions, performRequest } = client;

      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      shouldPerformTheRequest({
        fetch,
        method: 'GET',
        namespace,
        performRequest,
        url,
      });

      shouldHandleTheResponse({
        actions,
        fetch,
        namespace,
        performRequest,
      });
    });

    describe('reducer', () => {
      const { actions, reducer } = client;
      const initialState = generateInitialState({ data: {}, namespace });

      shouldGenerateTheReducer({
        actions,
        initialState,
        reducer,
      });
    });

    describe('selector', () => {
      const { selector } = client;

      shouldGenerateTheSelector({ namespace, selector });
    });

    describe('url', () => {
      it('should return the url', () => {
        expect(client.url).toEqual(url);
      });
    });
  });

  describe('with data: value', () => {
    const data = { name: '' };
    const client = buildClient({ ...defaultOptions, data });

    describe('reducer', () => {
      const { actions, reducer } = client;
      const initialState = generateInitialState({ data, namespace });

      shouldGenerateTheReducer({
        actions,
        initialState,
        reducer,
      });
    });
  });

  describe('with method: value', () => {
    const method = 'POST';
    const client = buildClient({ ...defaultOptions, method });

    describe('method', () => {
      it('should return the method', () => {
        expect(client.method).toEqual(method);
      });
    });

    describe('performRequest()', () => {
      const { performRequest } = client;
      const data = {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Self-Sealing Stem Bolt',
        cargoType: 'Trade Goods',
        quantity: 50,
      };
      const body = JSON.stringify(underscoreKeys(data));

      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      shouldPerformTheRequest({
        body,
        fetch,
        method,
        namespace,
        performRequest,
        url,
      });
    });
  });

  describe('with middleware: array', () => {
    const addHeader = headers => next => (opts) => {
      const request = next(opts);

      return Object.assign(
        {},
        request,
        {
          headers: Object.assign(
            {},
            request.headers,
            headers,
          ),
        },
      );
    };
    const genericMiddleware = next => opts => next(opts);
    const reducerInner = jest.fn();
    const reducerMiddleware = jest.fn(label => next => (state, action) => {
      reducerInner(state, action, label);

      return next(state, action);
    });
    const middleware = [
      {
        buildRequest: addHeader({ 'Header-A': 'header A' }),
      },
      {
        handleAction: reducerMiddleware('B'),
      },
      {
        handleFailure: genericMiddleware,
      },
      {
        handlePending: genericMiddleware,
      },
      {
        handleSuccess: genericMiddleware,
      },
      {
        buildRequest: addHeader({ 'Header-F': 'header F' }),
        handleAction: reducerMiddleware('F'),
        handleFailure: genericMiddleware,
        handlePending: genericMiddleware,
        handleSuccess: genericMiddleware,
      },
    ];
    const client = buildClient({ ...defaultOptions, middleware });

    describe('middleware', () => {
      it('should return the configured middleware', () => {
        expect(client.middleware).toEqual(middleware);
      });
    });

    describe('reducer', () => {
      const { actions, reducer } = client;
      const initialState = generateInitialState({ data: {}, namespace });

      it('should define the reducer', () => {
        expect(typeof reducer).toEqual('function');
      });

      shouldGenerateTheReducer({
        actions,
        initialState,
        reducer,
      });

      it('should call the handleAction middleware', () => {
        const state = { key: 'value' };
        const action = { type: 'actionType' };

        reducer(state, action);

        expect(reducerInner).toHaveBeenCalledWith(state, action, 'B');
        expect(reducerInner).toHaveBeenCalledWith(state, action, 'F');
      });
    });

    describe('request', () => {
      const { method, performRequest } = client;

      shouldPerformTheRequest({
        fetch,
        headers: {
          'Header-A': 'header A',
          'Content-Type': 'application/json',
          'Header-F': 'header F',
        },
        method,
        namespace,
        performRequest,
        url,
      });
    });
  });
});
