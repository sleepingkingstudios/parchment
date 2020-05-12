import fetch from 'cross-fetch';

import ApiRequest from './request';
import generateActions from './actions';
import { PENDING } from '../status';
import {
  assign,
  exists,
  underscoreKeys,
  valueOrDefault,
} from '../../utils/object';

jest.mock('cross-fetch');

describe('ApiRequest', () => {
  const defaultOptions = {
    method: 'GET',
    namespace: 'endpoint',
    url: '/api/endpoint',
  };
  const data = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Inigo Montoya',
    firstName: 'Inigo',
    lastName: 'Montoya',
  };
  const errors = [
    ['name', 'is Inigo Montoya'],
    ['name', 'you kill my father'],
    ['name', 'prepare to die'],
  ];
  const buildState = (namespace, state) => (
    assign({}, state, ...namespace.split('/'))
  );

  const shouldPerformTheRequest = (options) => {
    const {
      body,
      namespace,
      params,
      request,
    } = options;
    const {
      method,
      performRequest,
    } = request;
    const url = valueOrDefault(options.url, request.url);

    it('should perform the API request', async () => {
      const state = buildState(namespace, { data });
      const dispatch = jest.fn();
      const getState = jest.fn(() => state);
      const response = { ok: true, json: () => ({ data: {} }) };
      const headers = { 'Content-Type': 'application/json' };
      const opts = exists(body)
        ? { body, method, headers }
        : { method, headers };

      fetch.mockResolvedValue(response);

      await performRequest(params)(dispatch, getState);

      expect(fetch).toBeCalledWith(url, opts);
    });

    it('should call buildRequest()', async () => {
      const originalBuildRequest = request.buildRequest;
      const state = buildState(namespace, { data });
      const dispatch = jest.fn();
      const getState = jest.fn(() => state);
      const response = { ok: true, json: () => ({ data: {} }) };

      request.buildRequest = jest.fn();

      fetch.mockResolvedValue(response);

      await performRequest()(dispatch, getState);

      expect(request.buildRequest)
        .toHaveBeenCalledWith({ getState, method, namespace });

      request.buildRequest = originalBuildRequest;
    });

    describe('with onRequest: function', () => {
      it('should call onRequest and buildRequest()', async () => {
        const onRequestInner = jest.fn();
        const onRequest = next => (props) => {
          next(props);

          onRequestInner(props);
        };
        const originalBuildRequest = request.buildRequest;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };

        request.buildRequest = jest.fn();

        fetch.mockResolvedValue(response);

        await performRequest({ onRequest })(dispatch, getState);

        expect(onRequestInner)
          .toHaveBeenCalledWith({ getState, method, namespace });
        expect(request.buildRequest)
          .toHaveBeenCalledWith({ getState, method, namespace });

        request.buildRequest = originalBuildRequest;
      });
    });
  };
  const shouldHandleTheResponse = ({ actions, namespace, request }) => {
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const { performRequest } = request;

    describe('when the API request is rejected', () => {
      it('should dispatch REQUEST_PENDING and REQUEST_FAILURE', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const expectedErrors = {};
        const error = new Error('Something went wrong');
        const dispatchedActions = dispatch.mock.calls;

        fetch.mockRejectedValue(error);

        await performRequest()(dispatch, getState);

        expect(dispatchedActions.length).toBe(2);
        expect(dispatchedActions[0][0]).toEqual(requestPending());
        expect(dispatchedActions[1][0]).toEqual(requestFailure(expectedErrors));
      });

      it('should call handlePending()', async () => {
        const originalHandlePending = request.handlePending;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const error = new Error('Something went wrong');

        request.handlePending = jest.fn();

        fetch.mockRejectedValue(error);

        await performRequest()(dispatch, getState);

        expect(request.handlePending)
          .toHaveBeenCalledWith({ dispatch, getState });

        request.handlePending = originalHandlePending;
      });

      it('should call handleFailure()', async () => {
        const originalHandleFailure = request.handleFailure;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const error = new Error('Something went wrong');
        const expected = {
          json: { ok: false },
          ok: false,
        };

        request.handleFailure = jest.fn();

        fetch.mockRejectedValue(error);

        await performRequest()(dispatch, getState);

        expect(request.handleFailure)
          .toHaveBeenCalledWith({ dispatch, getState, response: expected });

        request.handleFailure = originalHandleFailure;
      });

      describe('with onFailure: function', () => {
        it('should call onFailure and handleFailure()', async () => {
          const onFailureInner = jest.fn();
          const onFailure = next => (props) => {
            next(props);

            onFailureInner(props);
          };
          const originalHandleFailure = request.handleFailure;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const error = new Error('Something went wrong');
          const expected = {
            json: { ok: false },
            ok: false,
          };

          request.handleFailure = jest.fn();

          fetch.mockRejectedValue(error);

          await performRequest({ onFailure })(dispatch, getState);

          expect(onFailureInner)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });
          expect(request.handleFailure)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });

          request.handleFailure = originalHandleFailure;
        });
      });

      describe('with onPending: function', () => {
        it('should call onPending and handlePending()', async () => {
          const onPendingInner = jest.fn();
          const onPending = next => (props) => {
            next(props);

            onPendingInner(props);
          };
          const originalHandlePending = request.handlePending;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const error = new Error('Something went wrong');

          request.handlePending = jest.fn();

          fetch.mockRejectedValue(error);

          await performRequest({ onPending })(dispatch, getState);

          expect(onPendingInner)
            .toHaveBeenCalledWith({ dispatch, getState });
          expect(request.handlePending)
            .toHaveBeenCalledWith({ dispatch, getState });

          request.handlePending = originalHandlePending;
        });
      });
    });

    describe('when the API response is empty', () => {
      it('should dispatch REQUEST_PENDING and REQUEST_FAILURE', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const expectedErrors = {};
        const response = { ok: false, json: () => { JSON.parse(''); } };
        const dispatchedActions = dispatch.mock.calls;

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(dispatchedActions.length).toBe(2);
        expect(dispatchedActions[0][0]).toEqual(requestPending());
        expect(dispatchedActions[1][0]).toEqual(requestFailure(expectedErrors));
      });

      it('should call handlePending()', async () => {
        const originalHandlePending = request.handlePending;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: false, json: () => { JSON.parse(''); } };

        request.handlePending = jest.fn();

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(request.handlePending)
          .toHaveBeenCalledWith({ dispatch, getState });

        request.handlePending = originalHandlePending;
      });

      it('should call handleFailure()', async () => {
        const originalHandleFailure = request.handleFailure;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: false, json: () => { JSON.parse(''); } };
        const expected = {
          json: { ok: false },
          ok: false,
        };

        request.handleFailure = jest.fn();

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(request.handleFailure)
          .toHaveBeenCalledWith({ dispatch, getState, response: expected });

        request.handleFailure = originalHandleFailure;
      });

      describe('with onFailure: function', () => {
        it('should call onFailure and handleFailure()', async () => {
          const onFailureInner = jest.fn();
          const onFailure = next => (props) => {
            next(props);

            onFailureInner(props);
          };
          const originalHandleFailure = request.handleFailure;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const response = { ok: false, json: () => { JSON.parse(''); } };
          const expected = {
            json: { ok: false },
            ok: false,
          };

          request.handleFailure = jest.fn();

          fetch.mockResolvedValue(response);

          await performRequest({ onFailure })(dispatch, getState);

          expect(onFailureInner)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });
          expect(request.handleFailure)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });

          request.handleFailure = originalHandleFailure;
        });
      });

      describe('with onPending: function', () => {
        it('should call onPending and handlePending()', async () => {
          const onPendingInner = jest.fn();
          const onPending = next => (props) => {
            next(props);

            onPendingInner(props);
          };
          const originalHandlePending = request.handlePending;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const response = { ok: false, json: () => { JSON.parse(''); } };

          request.handlePending = jest.fn();

          fetch.mockResolvedValue(response);

          await performRequest({ onPending })(dispatch, getState);

          expect(onPendingInner)
            .toHaveBeenCalledWith({ dispatch, getState });
          expect(request.handlePending)
            .toHaveBeenCalledWith({ dispatch, getState });

          request.handlePending = originalHandlePending;
        });
      });
    });

    describe('when the API response is invalid JSON', () => {
      it('should dispatch REQUEST_PENDING and REQUEST_FAILURE', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const expectedErrors = {};
        const response = { ok: false, json: () => { JSON.parse('<html />'); } };
        const dispatchedActions = dispatch.mock.calls;

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(dispatchedActions.length).toBe(2);
        expect(dispatchedActions[0][0]).toEqual(requestPending());
        expect(dispatchedActions[1][0]).toEqual(requestFailure(expectedErrors));
      });

      it('should call handlePending()', async () => {
        const originalHandlePending = request.handlePending;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: false, json: () => { JSON.parse('<html />'); } };

        request.handlePending = jest.fn();

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(request.handlePending)
          .toHaveBeenCalledWith({ dispatch, getState });

        request.handlePending = originalHandlePending;
      });

      it('should call handleFailure()', async () => {
        const originalHandleFailure = request.handleFailure;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: false, json: () => { JSON.parse('<html />'); } };
        const expected = {
          json: { ok: false },
          ok: false,
        };

        request.handleFailure = jest.fn();

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(request.handleFailure)
          .toHaveBeenCalledWith({ dispatch, getState, response: expected });

        request.handleFailure = originalHandleFailure;
      });

      describe('with onFailure: function', () => {
        it('should call onFailure and handleFailure()', async () => {
          const onFailureInner = jest.fn();
          const onFailure = next => (props) => {
            next(props);

            onFailureInner(props);
          };
          const originalHandleFailure = request.handleFailure;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const response = { ok: false, json: () => { JSON.parse('<html />'); } };
          const expected = {
            json: { ok: false },
            ok: false,
          };

          request.handleFailure = jest.fn();

          fetch.mockResolvedValue(response);

          await performRequest({ onFailure })(dispatch, getState);

          expect(onFailureInner)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });
          expect(request.handleFailure)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });

          request.handleFailure = originalHandleFailure;
        });
      });

      describe('with onPending: function', () => {
        it('should call onPending and handlePending()', async () => {
          const onPendingInner = jest.fn();
          const onPending = next => (props) => {
            next(props);

            onPendingInner(props);
          };
          const originalHandlePending = request.handlePending;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const response = { ok: false, json: () => { JSON.parse('<html />'); } };

          request.handlePending = jest.fn();

          fetch.mockResolvedValue(response);

          await performRequest({ onPending })(dispatch, getState);

          expect(onPendingInner)
            .toHaveBeenCalledWith({ dispatch, getState });
          expect(request.handlePending)
            .toHaveBeenCalledWith({ dispatch, getState });

          request.handlePending = originalHandlePending;
        });
      });
    });

    describe('when the API request fails', () => {
      it('should dispatch REQUEST_PENDING and REQUEST_FAILURE', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const expectedErrors = {
          name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
        };
        const json = {
          ok: false,
          error: { data: { errors } },
        };
        const response = { ok: false, json: () => json };
        const dispatchedActions = dispatch.mock.calls;

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(dispatchedActions.length).toBe(2);
        expect(dispatchedActions[0][0]).toEqual(requestPending());
        expect(dispatchedActions[1][0]).toEqual(requestFailure(expectedErrors));
      });

      it('should call handlePending()', async () => {
        const originalHandlePending = request.handlePending;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const json = {
          ok: false,
          error: { data: { errors } },
        };
        const response = { ok: false, json: () => json };

        request.handlePending = jest.fn();

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(request.handlePending)
          .toHaveBeenCalledWith({ dispatch, getState });

        request.handlePending = originalHandlePending;
      });

      it('should call handleFailure()', async () => {
        const originalHandleFailure = request.handleFailure;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const json = {
          ok: false,
          error: { data: { errors } },
        };
        const response = { ok: false, json: () => json };
        const expected = {
          headers: undefined,
          json,
          ok: false,
          status: undefined,
          statusText: undefined,
        };

        request.handleFailure = jest.fn();

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(request.handleFailure)
          .toHaveBeenCalledWith({ dispatch, getState, response: expected });

        request.handleFailure = originalHandleFailure;
      });

      describe('with onFailure: function', () => {
        it('should call onFailure and handleFailure()', async () => {
          const onFailureInner = jest.fn();
          const onFailure = next => (props) => {
            next(props);

            onFailureInner(props);
          };
          const originalHandleFailure = request.handleFailure;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const json = {
            ok: false,
            error: { data: { errors } },
          };
          const response = { ok: false, json: () => json };
          const expected = {
            headers: undefined,
            json,
            ok: false,
            status: undefined,
            statusText: undefined,
          };

          request.handleFailure = jest.fn();

          fetch.mockResolvedValue(response);

          await performRequest({ onFailure })(dispatch, getState);

          expect(onFailureInner)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });
          expect(request.handleFailure)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });

          request.handleFailure = originalHandleFailure;
        });
      });

      describe('with onPending: function', () => {
        it('should call onPending and handlePending()', async () => {
          const onPendingInner = jest.fn();
          const onPending = next => (props) => {
            next(props);

            onPendingInner(props);
          };
          const originalHandlePending = request.handlePending;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const json = {
            ok: false,
            error: { data: { errors } },
          };
          const response = { ok: false, json: () => json };

          request.handlePending = jest.fn();

          fetch.mockResolvedValue(response);

          await performRequest({ onPending })(dispatch, getState);

          expect(onPendingInner)
            .toHaveBeenCalledWith({ dispatch, getState });
          expect(request.handlePending)
            .toHaveBeenCalledWith({ dispatch, getState });

          request.handlePending = originalHandlePending;
        });
      });
    });

    describe('when the API request succeeds', () => {
      it('should dispatch REQUEST_PENDING and REQUEST_SUCCESS', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const json = {
          ok: true,
          data: underscoreKeys(data),
        };
        const response = { ok: true, json: () => json };
        const dispatchedActions = dispatch.mock.calls;

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(dispatchedActions.length).toBe(2);
        expect(dispatchedActions[0][0]).toEqual(requestPending());
        expect(dispatchedActions[1][0]).toEqual(requestSuccess(data));
      });

      it('should call handlePending()', async () => {
        const originalHandlePending = request.handlePending;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const json = {
          ok: true,
          data: underscoreKeys(data),
        };
        const response = { ok: true, json: () => json };

        request.handlePending = jest.fn();

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(request.handlePending)
          .toHaveBeenCalledWith({ dispatch, getState });

        request.handlePending = originalHandlePending;
      });

      it('should call handleSuccess()', async () => {
        const originalHandleSuccess = request.handleSuccess;
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const json = {
          ok: true,
          data: underscoreKeys(data),
        };
        const response = { ok: true, json: () => json };
        const expected = {
          headers: undefined,
          json,
          ok: true,
          status: undefined,
          statusText: undefined,
        };

        request.handleSuccess = jest.fn();

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(request.handleSuccess)
          .toHaveBeenCalledWith({ dispatch, getState, response: expected });

        request.handleSuccess = originalHandleSuccess;
      });

      describe('with onPending: function', () => {
        it('should call onPending and handlePending()', async () => {
          const onPendingInner = jest.fn();
          const onPending = next => (props) => {
            next(props);

            onPendingInner(props);
          };
          const originalHandlePending = request.handlePending;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const json = {
            ok: true,
            data: underscoreKeys(data),
          };
          const response = { ok: true, json: () => json };

          request.handlePending = jest.fn();

          fetch.mockResolvedValue(response);

          await performRequest({ onPending })(dispatch, getState);

          expect(onPendingInner)
            .toHaveBeenCalledWith({ dispatch, getState });
          expect(request.handlePending)
            .toHaveBeenCalledWith({ dispatch, getState });

          request.handlePending = originalHandlePending;
        });
      });

      describe('with onSuccess: function', () => {
        it('should call onSuccess and handleSuccess()', async () => {
          const onSuccessInner = jest.fn();
          const onSuccess = next => (props) => {
            next(props);

            onSuccessInner(props);
          };
          const originalHandleSuccess = request.handleSuccess;
          const state = buildState(namespace, { data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const json = {
            ok: true,
            data: underscoreKeys(data),
          };
          const response = { ok: true, json: () => json };
          const expected = {
            headers: undefined,
            json,
            ok: true,
            status: undefined,
            statusText: undefined,
          };

          request.handleSuccess = jest.fn();

          fetch.mockResolvedValue(response);

          await performRequest({ onSuccess })(dispatch, getState);

          expect(onSuccessInner)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });
          expect(request.handleSuccess)
            .toHaveBeenCalledWith({ dispatch, getState, response: expected });

          request.handleSuccess = originalHandleSuccess;
        });
      });
    });

    describe('when the request is pending', () => {
      beforeEach(() => { fetch.mockClear(); });

      it('should not perform the request', async () => {
        const status = PENDING;
        const state = buildState(namespace, { data, status });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);

        await performRequest()(dispatch, getState);

        expect(fetch).not.toBeCalled();
      });

      it('should not dispatch any actions', async () => {
        const status = PENDING;
        const state = buildState(namespace, { data, status });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const dispatchedActions = dispatch.mock.calls;

        await performRequest()(dispatch, getState);

        expect(dispatchedActions.length).toBe(0);
      });
    });
  };

  describe('with method: DELETE', () => {
    const method = 'DELETE';

    describe('with default options', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = { ...defaultOptions, actions, method };
      const request = new ApiRequest(options);
      const {
        performRequest,
        url,
      } = request;

      describe('method', () => {
        it('should be the configured url', () => {
          expect(request.method).toEqual(method);
        });
      });

      describe('performRequest', () => {
        it('should be a function', () => {
          expect(typeof performRequest).toEqual('function');
        });

        it('should return a function', () => {
          const { id } = data;

          expect(typeof performRequest({ id })).toEqual('function');
        });

        shouldPerformTheRequest({
          namespace,
          request,
        });

        shouldHandleTheResponse({
          actions,
          namespace,
          request,
        });
      });

      describe('url', () => {
        it('should be the configured url', () => {
          expect(url).toEqual(options.url);
        });
      });
    });

    describe('with namespace: nested', () => {
      const namespace = 'path/to/endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        namespace,
      };
      const request = new ApiRequest(options);

      describe('performRequest', () => {
        shouldPerformTheRequest({
          namespace,
          request,
        });
      });
    });

    describe('with url: with wildcards', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        url: '/colors/:color/hues/:id',
      };
      const request = new ApiRequest(options);
      const wildcards = { color: 'red', id: '0' };

      describe('performRequest', () => {
        shouldPerformTheRequest({
          namespace,
          params: { wildcards },
          request,
          url: '/colors/red/hues/0',
        });
      });
    });
  });

  describe('with method: GET', () => {
    const method = 'GET';

    describe('with default options', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = { ...defaultOptions, actions, method };
      const request = new ApiRequest(options);
      const {
        performRequest,
        url,
      } = request;

      describe('method', () => {
        it('should be the configured url', () => {
          expect(request.method).toEqual(method);
        });
      });

      describe('performRequest', () => {
        it('should be a function', () => {
          expect(typeof performRequest).toEqual('function');
        });

        it('should return a function', () => {
          const { id } = data;

          expect(typeof performRequest({ id })).toEqual('function');
        });

        shouldPerformTheRequest({
          namespace,
          request,
        });

        shouldHandleTheResponse({
          actions,
          namespace,
          request,
        });
      });

      describe('url', () => {
        it('should be the configured url', () => {
          expect(url).toEqual(options.url);
        });
      });
    });

    describe('with namespace: nested', () => {
      const namespace = 'path/to/endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        namespace,
      };
      const request = new ApiRequest(options);

      describe('performRequest', () => {
        shouldPerformTheRequest({
          namespace,
          request,
        });
      });
    });

    describe('with url: with wildcards', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        url: '/colors/:color/hues/:id',
      };
      const request = new ApiRequest(options);
      const wildcards = { color: 'red', id: '0' };

      describe('performRequest', () => {
        shouldPerformTheRequest({
          namespace,
          params: { wildcards },
          request,
          url: '/colors/red/hues/0',
        });
      });
    });
  });

  describe('with method: PATCH', () => {
    const method = 'PATCH';

    describe('with default options', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = { ...defaultOptions, actions, method };
      const request = new ApiRequest(options);
      const {
        performRequest,
        url,
      } = request;

      describe('method', () => {
        it('should be the configured url', () => {
          expect(request.method).toEqual(method);
        });
      });

      describe('performRequest', () => {
        const body = JSON.stringify(underscoreKeys(data));

        it('should be a function', () => {
          expect(typeof performRequest).toEqual('function');
        });

        it('should return a function', () => {
          const { id } = data;

          expect(typeof performRequest({ id })).toEqual('function');
        });

        shouldPerformTheRequest({
          body,
          namespace: 'endpoint',
          request,
        });

        shouldHandleTheResponse({
          actions,
          namespace: 'endpoint',
          request,
        });
      });

      describe('url', () => {
        it('should be the configured url', () => {
          expect(url).toEqual(options.url);
        });
      });
    });

    describe('with namespace: nested', () => {
      const namespace = 'path/to/endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        namespace,
      };
      const request = new ApiRequest(options);

      describe('performRequest', () => {
        const body = JSON.stringify(underscoreKeys(data));

        shouldPerformTheRequest({
          body,
          namespace,
          request,
        });
      });
    });

    describe('with url: with wildcards', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        url: '/colors/:color/hues/:id',
      };
      const request = new ApiRequest(options);
      const wildcards = { color: 'red', id: '0' };

      describe('performRequest', () => {
        const body = JSON.stringify(underscoreKeys(data));

        shouldPerformTheRequest({
          body,
          namespace,
          params: { wildcards },
          request,
          url: '/colors/red/hues/0',
        });
      });
    });
  });

  describe('with method: POST', () => {
    const method = 'POST';

    describe('with default options', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = { ...defaultOptions, actions, method };
      const request = new ApiRequest(options);
      const {
        performRequest,
        url,
      } = request;

      describe('method', () => {
        it('should be the configured url', () => {
          expect(request.method).toEqual(method);
        });
      });

      describe('performRequest', () => {
        const body = JSON.stringify(underscoreKeys(data));

        it('should be a function', () => {
          expect(typeof performRequest).toEqual('function');
        });

        it('should return a function', () => {
          const { id } = data;

          expect(typeof performRequest({ id })).toEqual('function');
        });

        shouldPerformTheRequest({
          body,
          namespace: 'endpoint',
          request,
        });

        shouldHandleTheResponse({
          actions,
          namespace: 'endpoint',
          request,
        });
      });

      describe('url', () => {
        it('should be the configured url', () => {
          expect(url).toEqual(options.url);
        });
      });
    });

    describe('with namespace: nested', () => {
      const namespace = 'path/to/endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        namespace,
      };
      const request = new ApiRequest(options);

      describe('performRequest', () => {
        const body = JSON.stringify(underscoreKeys(data));

        shouldPerformTheRequest({
          body,
          namespace,
          request,
        });
      });
    });

    describe('with url: with wildcards', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        url: '/colors/:color/hues/:id',
      };
      const request = new ApiRequest(options);
      const wildcards = { color: 'red', id: '0' };

      describe('performRequest', () => {
        const body = JSON.stringify(underscoreKeys(data));

        shouldPerformTheRequest({
          body,
          namespace,
          params: { wildcards },
          request,
          url: '/colors/red/hues/0',
        });
      });
    });
  });

  describe('with method: PUT', () => {
    const method = 'PUT';

    describe('with default options', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = { ...defaultOptions, actions, method };
      const request = new ApiRequest(options);
      const {
        performRequest,
        url,
      } = request;

      describe('method', () => {
        it('should be the configured url', () => {
          expect(request.method).toEqual(method);
        });
      });

      describe('performRequest', () => {
        const body = JSON.stringify(underscoreKeys(data));

        it('should be a function', () => {
          expect(typeof performRequest).toEqual('function');
        });

        it('should return a function', () => {
          const { id } = data;

          expect(typeof performRequest({ id })).toEqual('function');
        });

        shouldPerformTheRequest({
          body,
          namespace: 'endpoint',
          request,
        });

        shouldHandleTheResponse({
          actions,
          namespace: 'endpoint',
          request,
        });
      });

      describe('url', () => {
        it('should be the configured url', () => {
          expect(url).toEqual(options.url);
        });
      });
    });

    describe('with namespace: nested', () => {
      const namespace = 'path/to/endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        namespace,
      };
      const request = new ApiRequest(options);

      describe('performRequest', () => {
        const body = JSON.stringify(underscoreKeys(data));

        shouldPerformTheRequest({
          body,
          namespace,
          request,
        });
      });
    });

    describe('with url: with wildcards', () => {
      const namespace = 'endpoint';
      const actions = generateActions({ namespace });
      const options = {
        ...defaultOptions,
        actions,
        method,
        url: '/colors/:color/hues/:id',
      };
      const request = new ApiRequest(options);
      const wildcards = { color: 'red', id: '0' };

      describe('performRequest', () => {
        const body = JSON.stringify(underscoreKeys(data));

        shouldPerformTheRequest({
          body,
          namespace,
          params: { wildcards },
          request,
          url: '/colors/red/hues/0',
        });
      });
    });
  });
});
