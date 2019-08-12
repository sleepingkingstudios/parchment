import fetch from 'cross-fetch';

import ApiRequest from './request';
import generateActions from './actions';
import {
  deepAssignProperty,
  underscoreKeys,
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
  const buildState = (namespace, state) => {
    const obj = {};
    const segments = namespace.split('/');

    return deepAssignProperty(obj, segments[0], state, segments.slice(1));
  };

  describe('with method: DELETE', () => {
    const namespace = 'endpoint';
    const actions = generateActions({ namespace });
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const options = { ...defaultOptions, actions, method: 'DELETE' };
    const request = new ApiRequest(options);
    const {
      method,
      performRequest,
      url,
    } = request;

    describe('method', () => {
      it('should be the configured url', () => {
        expect(method).toEqual(options.method);
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

      it('should DELETE the data from the API endpoint', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method, headers };

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(fetch).toBeCalledWith(url, opts);
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
      });
    });

    describe('url', () => {
      it('should be the configured url', () => {
        expect(url).toEqual(options.url);
      });
    });
  });

  describe('with method: GET', () => {
    const namespace = 'endpoint';
    const actions = generateActions({ namespace });
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const options = { ...defaultOptions, actions, method: 'GET' };
    const request = new ApiRequest(options);
    const {
      method,
      performRequest,
      url,
    } = request;

    describe('method', () => {
      it('should be the configured url', () => {
        expect(method).toEqual(options.method);
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

      it('should GET the data from the API endpoint', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method, headers };

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(fetch).toBeCalledWith(url, opts);
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
      });
    });

    describe('url', () => {
      it('should be the configured url', () => {
        expect(url).toEqual(options.url);
      });
    });
  });

  describe('with method: GET and namespace: nested', () => {
    const namespace = 'path/to/endpoint';
    const actions = generateActions({ namespace });
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const options = { ...defaultOptions, actions, method: 'GET' };
    const request = new ApiRequest(options);
    const {
      method,
      performRequest,
      url,
    } = request;

    describe('performRequest', () => {
      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      it('should return a function', () => {
        const { id } = data;

        expect(typeof performRequest({ id })).toEqual('function');
      });

      it('should GET the data from the API endpoint', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method, headers };

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(fetch).toBeCalledWith(url, opts);
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
      });
    });
  });

  describe('with method: GET and url: with wildcards', () => {
    const namespace = 'endpoint';
    const actions = generateActions({ namespace });
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const options = {
      ...defaultOptions,
      actions,
      method: 'GET',
      url: '/colors/:color/hues/:id',
    };
    const request = new ApiRequest(options);
    const {
      method,
      performRequest,
      url,
    } = request;

    describe('performRequest', () => {
      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      it('should return a function', () => {
        const { id } = data;

        expect(typeof performRequest({ id })).toEqual('function');
      });

      it('should GET the data from the API endpoint', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method, headers };
        const expected = '/colors/red/hues/0';

        fetch.mockResolvedValue(response);

        await performRequest({ color: 'red', id: '0' })(dispatch, getState);

        expect(fetch).toBeCalledWith(expected, opts);
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

          await performRequest({ color: 'red', id: '0' })(dispatch, getState);

          expect(dispatchedActions.length).toBe(2);
          expect(dispatchedActions[0][0]).toEqual(requestPending());
          expect(dispatchedActions[1][0]).toEqual(requestFailure(expectedErrors));
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

          await performRequest({ color: 'red', id: '0' })(dispatch, getState);

          expect(dispatchedActions.length).toBe(2);
          expect(dispatchedActions[0][0]).toEqual(requestPending());
          expect(dispatchedActions[1][0]).toEqual(requestSuccess(data));
        });
      });
    });

    describe('url', () => {
      it('should be the configured url', () => {
        expect(url).toEqual(options.url);
      });
    });
  });

  describe('with method: PATCH', () => {
    const namespace = 'endpoint';
    const actions = generateActions({ namespace });
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const options = { ...defaultOptions, actions, method: 'PATCH' };
    const request = new ApiRequest(options);
    const {
      method,
      performRequest,
      url,
    } = request;

    describe('method', () => {
      it('should be the configured url', () => {
        expect(method).toEqual(options.method);
      });
    });

    describe('performRequest', () => {
      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      it('should return a function', () => {
        expect(typeof performRequest()).toEqual('function');
      });

      it('should PATCH the data to the API endpoint', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const body = JSON.stringify(underscoreKeys(data));
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method, body, headers };

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(fetch).toBeCalledWith(url, opts);
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
      });
    });

    describe('url', () => {
      it('should be the configured url', () => {
        expect(url).toEqual(options.url);
      });
    });
  });

  describe('with method: POST', () => {
    const namespace = 'endpoint';
    const actions = generateActions({ namespace });
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const options = { ...defaultOptions, actions, method: 'POST' };
    const request = new ApiRequest(options);
    const {
      method,
      performRequest,
      url,
    } = request;

    describe('method', () => {
      it('should be the configured url', () => {
        expect(method).toEqual(options.method);
      });
    });

    describe('performRequest', () => {
      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      it('should return a function', () => {
        expect(typeof performRequest()).toEqual('function');
      });

      it('should POST the data to the API endpoint', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const body = JSON.stringify(underscoreKeys(data));
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method, body, headers };

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(fetch).toBeCalledWith(url, opts);
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
      });
    });

    describe('url', () => {
      it('should be the configured url', () => {
        expect(url).toEqual(options.url);
      });
    });
  });

  describe('with method: POST and namespace: nested', () => {
    const namespace = 'path/to/endpoint';
    const actions = generateActions({ namespace });
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const options = { ...defaultOptions, actions, method: 'POST' };
    const request = new ApiRequest(options);
    const {
      method,
      performRequest,
      url,
    } = request;

    describe('performRequest', () => {
      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      it('should return a function', () => {
        expect(typeof performRequest()).toEqual('function');
      });

      it('should POST the data to the API endpoint', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const body = JSON.stringify(underscoreKeys(data));
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method, body, headers };

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(fetch).toBeCalledWith(url, opts);
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
      });
    });
  });

  describe('with method: POST and url: with wildcards', () => {
    const namespace = 'endpoint';
    const actions = generateActions({ namespace });
    const {
      requestFailure,
      requestPending,
      requestSuccess,
    } = actions;
    const options = {
      ...defaultOptions,
      actions,
      method: 'POST',
      url: '/colors/:color/hues/:id',
    };
    const request = new ApiRequest(options);
    const {
      method,
      performRequest,
      url,
    } = request;

    describe('performRequest', () => {
      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      it('should return a function', () => {
        expect(typeof performRequest()).toEqual('function');
      });

      it('should POST the data to the API endpoint', async () => {
        const state = buildState(namespace, { data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const body = JSON.stringify(underscoreKeys(data));
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method, body, headers };
        const expected = '/colors/red/hues/0';

        fetch.mockResolvedValue(response);

        await performRequest({ color: 'red', id: '0' })(dispatch, getState);

        expect(fetch).toBeCalledWith(expected, opts);
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

          await performRequest({ color: 'red', id: '0' })(dispatch, getState);

          expect(dispatchedActions.length).toBe(2);
          expect(dispatchedActions[0][0]).toEqual(requestPending());
          expect(dispatchedActions[1][0]).toEqual(requestFailure(expectedErrors));
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

          await performRequest({ color: 'red', id: '0' })(dispatch, getState);

          expect(dispatchedActions.length).toBe(2);
          expect(dispatchedActions[0][0]).toEqual(requestPending());
          expect(dispatchedActions[1][0]).toEqual(requestSuccess(data));
        });
      });
    });

    describe('url', () => {
      it('should be the configured url', () => {
        expect(url).toEqual(options.url);
      });
    });
  });
});
