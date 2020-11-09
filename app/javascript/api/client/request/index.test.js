import fetch from 'cross-fetch';

import buildEmptyResponse from './emptyResponse';
import generateActions from '../actions';
import generateRequest from './index';
import { PENDING } from '../../status';
import {
  assign,
  exists,
  underscoreKeys,
  valueOrDefault,
} from '../../../utils/object';

jest.mock('cross-fetch');

describe('generateRequest()', () => {
  const namespace = 'path/to/widgets';
  const actions = generateActions({ namespace });
  const defaultOptions = {
    method: 'GET',
    namespace,
    url: '/api/widgets',
  };
  const data = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Self-Sealing Stem Bolt',
    cargoType: 'Trade Goods',
    quantity: 50,
  };
  const errors = [
    ['cost', "can't be blank"],
    ['name', "won't fit on cargo manifest"],
    ['quantity', 'is too high'],
  ];
  const buildState = state => (
    assign({}, state, ...namespace.split('/'))
  );

  const shouldPerformTheRequest = (options) => {
    const {
      body,
      headers,
      params,
      request,
    } = options;
    const {
      method,
      performRequest,
    } = request;
    const url = valueOrDefault(options.url, request.url);

    it('should perform the API request', async () => {
      const state = buildState({ data });
      const dispatch = jest.fn();
      const getState = jest.fn(() => state);
      const response = { ok: true, json: () => ({ data: {} }) };
      const actualHeaders = valueOrDefault(headers, { 'Content-Type': 'application/json' });
      const opts = exists(body)
        ? { body, method, headers: actualHeaders }
        : { method, headers: actualHeaders };

      fetch.mockResolvedValue(response);

      await performRequest(params)(dispatch, getState);

      expect(fetch).toBeCalledWith(url, opts);
    });

    describe('when the request is already pending', () => {
      it('should not perform the API request', async () => {
        const state = buildState({ data, status: PENDING });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);

        await performRequest(params)(dispatch, getState);

        expect(fetch).not.toHaveBeenCalled();
      });
    });

    describe('with onRequest: function', () => {
      it('should call onRequest and buildRequest()', async () => {
        const onRequestInner = jest.fn();
        const onRequest = next => (props) => {
          next(props);

          onRequestInner(props);
        };
        const state = buildState({ data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };

        fetch.mockResolvedValue(response);

        await performRequest({ onRequest })(dispatch, getState);

        expect(onRequestInner)
          .toHaveBeenCalledWith({ getState, method, namespace });
      });
    });
  };
  const shouldHandleTheResponse = ({ middleware, request }) => {
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const { performRequest } = request;
    const failureActions = (expectedErrors) => {
      if (!exists(middleware)) { return [[requestFailure(expectedErrors)]]; }

      return [
        [{ type: 'b/failure/before' }],
        [{ type: 'e/failure/before' }],
        [requestFailure(expectedErrors)],
        [{ type: 'e/failure/after' }],
        [{ type: 'b/failure/after' }],
      ];
    };
    const pendingActions = () => {
      if (!exists(middleware)) { return [[requestPending()]]; }

      return [
        [{ type: 'c/pending/before' }],
        [{ type: 'e/pending/before' }],
        [requestPending()],
        [{ type: 'e/pending/after' }],
        [{ type: 'c/pending/after' }],
      ];
    };
    const successActions = (responseData) => {
      if (!exists(middleware)) { return [[requestSuccess(responseData)]]; }

      return [
        [{ type: 'd/success/before' }],
        [{ type: 'e/success/before' }],
        [requestSuccess(responseData)],
        [{ type: 'e/success/after' }],
        [{ type: 'd/success/after' }],
      ];
    };

    const shouldHandleTheFailedResponse = ({ expectedErrors, expectedResponse }) => {
      it('should dispatch REQUEST_PENDING and REQUEST_FAILURE', async () => {
        const state = buildState({ data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const dispatchedActions = dispatch.mock.calls;
        const expectedActions = [
          ...pendingActions(),
          ...failureActions(expectedErrors),
        ];

        await performRequest()(dispatch, getState);

        expect(dispatchedActions).toEqual(expectedActions);
      });

      describe('with onFailure: function', () => {
        it('should call onFailure', async () => {
          const onFailureInner = jest.fn();
          const onFailure = next => (props) => {
            next(props);

            onFailureInner(props);
          };
          const state = buildState({ data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);

          await performRequest({ onFailure })(dispatch, getState);

          expect(onFailureInner)
            .toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
        });
      });

      describe('with onPending: function', () => {
        it('should call onPending and handlePending()', async () => {
          const onPendingInner = jest.fn();
          const onPending = next => (props) => {
            next(props);

            onPendingInner(props);
          };
          const state = buildState({ data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);

          await performRequest({ onPending })(dispatch, getState);

          expect(onPendingInner)
            .toHaveBeenCalledWith({ dispatch, getState });
        });
      });
    };

    describe('when the API request is already pending', () => {
      it('should not dispatch any actions', async () => {
        const status = PENDING;
        const state = buildState({ data, status });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const dispatchedActions = dispatch.mock.calls;

        await performRequest()(dispatch, getState);

        expect(dispatchedActions.length).toBe(0);
      });
    });

    describe('when the API request is rejected', () => {
      const expectedErrors = {};
      const expectedResponse = buildEmptyResponse({ error: { message: 'Error: Something went wrong' } });

      beforeEach(() => {
        const error = new Error('Something went wrong');

        fetch.mockRejectedValue(error);
      });

      shouldHandleTheFailedResponse({ expectedErrors, expectedResponse });
    });

    describe('when the API response is empty', () => {
      const expectedErrors = {};
      const expectedResponse = buildEmptyResponse({ error: { message: 'SyntaxError: Unexpected end of JSON input' } });

      beforeEach(() => {
        const response = { ok: false, json: () => { JSON.parse(''); } };

        fetch.mockResolvedValue(response);
      });

      shouldHandleTheFailedResponse({ expectedErrors, expectedResponse });
    });

    describe('when the API response is invalid JSON', () => {
      const expectedErrors = {};
      const expectedResponse = buildEmptyResponse({ error: { message: 'SyntaxError: Unexpected token < in JSON at position 0' } });

      beforeEach(() => {
        const response = { ok: false, json: () => { JSON.parse('<html />'); } };

        fetch.mockResolvedValue(response);
      });

      shouldHandleTheFailedResponse({ expectedErrors, expectedResponse });
    });

    describe('when the API request fails', () => {
      const json = {
        ok: false,
        error: { data: { errors } },
      };
      const response = {
        json: () => json,
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      };
      const expectedErrors = {
        cost: ["can't be blank"],
        name: ["won't fit on cargo manifest"],
        quantity: ['is too high'],
      };
      const expectedResponse = Object.assign(
        buildEmptyResponse(),
        response,
        { json },
      );

      beforeEach(() => { fetch.mockResolvedValue(response); });

      shouldHandleTheFailedResponse({ expectedErrors, expectedResponse });
    });

    describe('when the API request succeeds', () => {
      const json = {
        ok: true,
        data: underscoreKeys(data),
      };
      const response = {
        json: () => json,
        ok: true,
        status: 200,
        statusText: 'OK',
      };
      const expectedResponse = Object.assign(
        buildEmptyResponse(),
        response,
        { json },
      );

      beforeEach(() => { fetch.mockResolvedValue(response); });

      it('should dispatch REQUEST_PENDING and REQUEST_SUCCESS', async () => {
        const state = buildState({ data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const dispatchedActions = dispatch.mock.calls;
        const expectedActions = [
          ...pendingActions(),
          ...successActions(data),
        ];

        await performRequest()(dispatch, getState);

        expect(dispatchedActions).toEqual(expectedActions);
      });

      describe('with onSuccess: function', () => {
        it('should call onSuccess', async () => {
          const onSuccessInner = jest.fn();
          const onSuccess = next => (props) => {
            next(props);

            onSuccessInner(props);
          };
          const state = buildState({ data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);

          await performRequest({ onSuccess })(dispatch, getState);

          expect(onSuccessInner)
            .toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
        });
      });

      describe('with onPending: function', () => {
        it('should call onPending and handlePending()', async () => {
          const onPendingInner = jest.fn();
          const onPending = next => (props) => {
            next(props);

            onPendingInner(props);
          };
          const state = buildState({ data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);

          await performRequest({ onPending })(dispatch, getState);

          expect(onPendingInner)
            .toHaveBeenCalledWith({ dispatch, getState });
        });
      });
    });
  };
  const shouldGenerateTheApiRequest = ({ body, method }) => {
    describe('with default options', () => {
      const options = { ...defaultOptions, actions, method };
      const request = generateRequest(options);

      describe('method', () => {
        it('should be the configured method', () => {
          expect(request.method).toEqual(method);
        });
      });

      describe('middleware', () => {
        it('should be an empty array', () => {
          expect(request.middleware).toEqual([]);
        });
      });

      describe('namespace', () => {
        it('should be the configured namespace', () => {
          expect(request.namespace).toEqual(namespace);
        });
      });

      describe('performRequest', () => {
        const { performRequest } = request;

        it('should be a function', () => {
          expect(typeof performRequest).toEqual('function');
        });

        it('should return a function', () => {
          const { id } = data;

          expect(typeof performRequest({ id })).toEqual('function');
        });

        shouldPerformTheRequest({
          body,
          namespace,
          request,
        });

        shouldHandleTheResponse({
          namespace,
          request,
        });
      });

      describe('url', () => {
        const { url } = defaultOptions;

        it('should be the configured url', () => {
          expect(request.url).toEqual(url);
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
      const generateMiddleware = label => next => (opts) => {
        const { dispatch } = opts;

        dispatch({ type: `${label}/before` });

        next(opts);

        dispatch({ type: `${label}/after` });
      };
      const middleware = [
        {
          buildRequest: addHeader({ 'Header-A': 'header A' }),
        },
        {
          handleFailure: generateMiddleware('b/failure'),
        },
        {
          handlePending: generateMiddleware('c/pending'),
        },
        {
          handleSuccess: generateMiddleware('d/success'),
        },
        {
          buildRequest: addHeader({ 'Header-E': 'header E' }),
          handleFailure: generateMiddleware('e/failure'),
          handlePending: generateMiddleware('e/pending'),
          handleSuccess: generateMiddleware('e/success'),
        },
      ];
      const options = {
        ...defaultOptions,
        actions,
        method,
        middleware,
      };
      const request = generateRequest(options);

      describe('middleware', () => {
        it('should be the configured middleware', () => {
          expect(request.middleware).toEqual(middleware);
        });
      });

      describe('performRequest', () => {
        shouldPerformTheRequest({
          body,
          headers: {
            'Header-A': 'header A',
            'Content-Type': 'application/json',
            'Header-E': 'header E',
          },
          namespace,
          request,
        });

        shouldHandleTheResponse({
          middleware,
          namespace,
          request,
        });
      });
    });

    describe('with url: with wildcards', () => {
      const options = {
        ...defaultOptions,
        actions,
        method,
        url: '/colors/:color/hues/:id',
      };
      const request = generateRequest(options);
      const wildcards = { color: 'red', id: '0' };

      describe('performRequest', () => {
        shouldPerformTheRequest({
          body,
          namespace,
          params: { wildcards },
          request,
          url: '/colors/red/hues/0',
        });
      });
    });
  };

  beforeEach(() => { fetch.mockClear(); });

  describe('with method: DELETE', () => {
    const method = 'DELETE';

    shouldGenerateTheApiRequest({ method });
  });

  describe('with method: GET', () => {
    const method = 'GET';

    shouldGenerateTheApiRequest({ method });
  });

  describe('with method: PATCH', () => {
    const method = 'PATCH';
    const body = JSON.stringify(underscoreKeys(data));

    shouldGenerateTheApiRequest({ body, method });
  });

  describe('with method: POST', () => {
    const method = 'POST';
    const body = JSON.stringify(underscoreKeys(data));

    shouldGenerateTheApiRequest({ body, method });
  });

  describe('with method: PUT', () => {
    const method = 'PUT';
    const body = JSON.stringify(underscoreKeys(data));

    shouldGenerateTheApiRequest({ body, method });
  });
});
