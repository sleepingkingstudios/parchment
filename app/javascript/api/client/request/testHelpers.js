/* eslint-env jest */

import { PENDING } from 'api/status';
import {
  assign,
  exists,
  underscoreKeys,
  valueOrDefault,
} from 'utils/object';

import buildEmptyResponse from './emptyResponse';

export const shouldHandleTheResponse = (opts) => {
  const {
    actions,
    fetch,
    middleware,
    namespace,
    performRequest,
  } = opts;
  const {
    requestFailure,
    requestPending,
    requestSuccess,
  } = actions;
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

export const shouldPerformTheRequest = (opts) => {
  const {
    body,
    fetch,
    headers,
    method,
    namespace,
    params,
    performRequest,
    url,
  } = opts;
  const buildState = valueOrDefault(
    opts.buildState,
    ({ data, errors, status }) => (
      assign({}, { data, errors, status }, ...namespace.split('/'))
    ),
  );
  const data = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Self-Sealing Stem Bolt',
    cargoType: 'Trade Goods',
    quantity: 50,
  };

  it('should perform the API request', async () => {
    const state = buildState({ data });
    const dispatch = jest.fn();
    const getState = jest.fn(() => state);
    const response = { ok: true, json: () => ({ data: {} }) };
    const actualHeaders = valueOrDefault(headers, { 'Content-Type': 'application/json' });
    const requestOptions = exists(body)
      ? { body, method, headers: actualHeaders }
      : { method, headers: actualHeaders };

    fetch.mockResolvedValue(response);

    await performRequest(params)(dispatch, getState);

    expect(fetch).toBeCalledWith(url, requestOptions);
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
      const expected = {
        getState,
        method,
        namespace,
      };

      if (method === 'GET' || method === 'DELETE') {
        Object.assign(expected, { data: null });
      } else {
        Object.assign(expected, { data });
      }

      fetch.mockResolvedValue(response);

      await performRequest({ onRequest })(dispatch, getState);

      expect(onRequestInner).toHaveBeenCalledWith(expected);
    });
  });
};
