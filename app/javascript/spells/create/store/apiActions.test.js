import fetch from 'cross-fetch';

import {
  SPELLS_API_URL,
  performRequest,
} from './apiActions';
import {
  requestFailure,
  requestPending,
  requestSuccess,
} from './actions';
import {
  underscoreKeys,
} from '../../../utils/object';

jest.mock('cross-fetch');

describe('Create Spell API actions', () => {
  describe('performRequest()', () => {
    const buildState = ({ data, errors }) => (
      { createSpell: { data, errors } }
    );
    const data = {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Inigo Montoya',
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
      expect(typeof performRequest()).toEqual('function');
    });

    it('should post the draft spell to /api/spells', async () => {
      const state = buildState({ data });
      const dispatch = jest.fn();
      const getState = jest.fn(() => state);
      const response = { ok: true, json: () => ({ data: {} }) };
      const method = 'POST';
      const body = JSON.stringify(underscoreKeys(data));
      const headers = { 'Content-Type': 'application/json' };
      const options = { method, body, headers };

      fetch.mockResolvedValue(response);

      await performRequest()(dispatch, getState);

      expect(fetch).toBeCalledWith(SPELLS_API_URL, options);
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
        const actions = dispatch.mock.calls;

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(actions.length).toBe(3);
        expect(actions[0][0]).toEqual(requestPending());
        expect(actions[1][0]).toEqual(requestFailure(expectedErrors));
      });
    });

    describe('when the API request succeeds', () => {
      it('should dispatch REQUEST_PENDING and REQUEST_SUCCESS', async () => {
        const state = buildState({ data });
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const json = {
          ok: true,
          data: {
            spell: underscoreKeys(data),
          },
        };
        const response = { ok: true, json: () => json };
        const actions = dispatch.mock.calls;

        fetch.mockResolvedValue(response);

        await performRequest()(dispatch, getState);

        expect(actions.length).toBe(4);
        expect(actions[0][0]).toEqual(requestPending());
        expect(actions[1][0]).toEqual(requestSuccess(data));
      });
    });
  });
});
