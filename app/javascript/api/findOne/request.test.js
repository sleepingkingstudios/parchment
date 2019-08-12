import fetch from 'cross-fetch';

import generateActions from '../endpoint/actions';
import FindOneRequest from './request';
import {
  underscoreKeys,
} from '../../utils/object';

jest.mock('cross-fetch');

describe('FindOneRequest', () => {
  const requestUrl = '/api/widgets';
  const namespace = 'findWidget';
  const actions = generateActions({ namespace });
  const {
    requestFailure,
    requestPending,
    requestSuccess,
  } = actions;
  const defaultOptions = {
    actions,
    namespace,
    url: requestUrl,
  };

  describe('with default options', () => {
    const method = 'GET';
    const request = new FindOneRequest(defaultOptions);
    const {
      performRequest,
      url,
    } = request;

    describe('performRequest', () => {
      const buildState = ({ data, errors }) => {
        const obj = {};

        obj[namespace] = { data, errors };

        return obj;
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

      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      it('should return a function', () => {
        const { id } = data;

        expect(typeof performRequest({ id })).toEqual('function');
      });

      it('should GET the data from the API endpoint', async () => {
        const state = buildState({ data });
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
          const state = buildState({ data });
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
          const state = buildState({ data });
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
        expect(url).toEqual(requestUrl);
      });
    });
  });

  describe('with a URL with parameters', () => {
    const options = {
      ...defaultOptions,
      url: `${requestUrl}/:id`,
    };
    const method = 'GET';
    const request = new FindOneRequest(options);
    const {
      performRequest,
    } = request;

    describe('performRequest', () => {
      const buildState = ({ data, errors }) => {
        const obj = {};

        obj[namespace] = { data, errors };

        return obj;
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

      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      it('should return a function', () => {
        const { id } = data;

        expect(typeof performRequest({ id })).toEqual('function');
      });

      it('should GET the data from the API endpoint', async () => {
        const { id } = data;
        const state = buildState({ data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method, headers };

        fetch.mockResolvedValue(response);

        await performRequest({ id })(dispatch, getState);

        expect(fetch).toBeCalledWith(`${requestUrl}/${id}`, opts);
      });

      describe('when the API request fails', () => {
        it('should dispatch REQUEST_PENDING and REQUEST_FAILURE', async () => {
          const { id } = data;
          const state = buildState({ data });
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

          await performRequest({ id })(dispatch, getState);

          expect(dispatchedActions.length).toBe(2);
          expect(dispatchedActions[0][0]).toEqual(requestPending());
          expect(dispatchedActions[1][0]).toEqual(requestFailure(expectedErrors));
        });
      });

      describe('when the API request succeeds', () => {
        it('should dispatch REQUEST_PENDING and REQUEST_SUCCESS', async () => {
          const { id } = data;
          const state = buildState({ data });
          const dispatch = jest.fn();
          const getState = jest.fn(() => state);
          const json = {
            ok: true,
            data: underscoreKeys(data),
          };
          const response = { ok: true, json: () => json };
          const dispatchedActions = dispatch.mock.calls;

          fetch.mockResolvedValue(response);

          await performRequest({ id })(dispatch, getState);

          expect(dispatchedActions.length).toBe(2);
          expect(dispatchedActions[0][0]).toEqual(requestPending());
          expect(dispatchedActions[1][0]).toEqual(requestSuccess(data));
        });
      });
    });
  });
});
