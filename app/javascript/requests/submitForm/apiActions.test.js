import fetch from 'cross-fetch';

import generateActions from './actions';
import generateApiActions from './apiActions';
import {
  underscoreKeys,
} from '../../utils/object';

jest.mock('cross-fetch');

describe('Form request actions', () => {
  const url = '/api/widgets';
  const namespace = 'createWidget';
  const actions = generateActions({ namespace });
  const {
    requestFailure,
    requestPending,
    requestSuccess,
  } = actions;
  const defaultOptions = {
    actions,
    namespace,
    url,
  };

  describe('generateApiActions', () => {
    it('should be a function', () => {
      expect(typeof generateApiActions).toEqual('function');
    });
  });

  describe('with default options', () => {
    const {
      REQUEST_URL,
      requestSubmitForm,
    } = generateApiActions(defaultOptions);

    describe('REQUEST_URL', () => {
      it('should be the configured url', () => {
        expect(REQUEST_URL).toEqual(url);
      });
    });

    describe('requestSubmitForm', () => {
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
        expect(typeof requestSubmitForm).toEqual('function');
      });

      it('should return a function', () => {
        expect(typeof requestSubmitForm()).toEqual('function');
      });

      it('should POST the data to the API endpoint', async () => {
        const state = buildState({ data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const response = { ok: true, json: () => ({ data: {} }) };
        const method = 'POST';
        const body = JSON.stringify(underscoreKeys(data));
        const headers = { 'Content-Type': 'application/json' };
        const options = { method, body, headers };

        fetch.mockResolvedValue(response);

        await requestSubmitForm()(dispatch, getState);

        expect(fetch).toBeCalledWith(url, options);
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
            errors,
          };
          const response = { ok: false, json: () => json };
          const dispatchedActions = dispatch.mock.calls;

          fetch.mockResolvedValue(response);

          await requestSubmitForm()(dispatch, getState);

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

          await requestSubmitForm()(dispatch, getState);

          expect(dispatchedActions.length).toBe(2);
          expect(dispatchedActions[0][0]).toEqual(requestPending());
          expect(dispatchedActions[1][0]).toEqual(requestSuccess(data));
        });
      });
    });
  });
});
