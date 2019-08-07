import fetch from 'cross-fetch';

import {
  SPELLS_API_URL,
  requestSpells,
} from './apiActions';
import {
  REQUEST_SPELLS_FAILURE,
  REQUEST_SPELLS_PENDING,
  requestSpellsSuccess,
} from './actions';
import { spellsData } from '../fixtures';
import {
  underscoreKeys,
} from '../../utils/object';

jest.mock('cross-fetch');

describe('Spells API actions', () => {
  describe('requestSpells()', () => {
    it('should be a function', () => {
      expect(typeof requestSpells).toEqual('function');
    });

    it('should return a function', () => {
      expect(typeof requestSpells()).toEqual('function');
    });

    it('should dispatch REQUEST_SPELLS_PENDING', async () => {
      const dispatch = jest.fn();
      const response = { ok: true, json: () => ({ data: { spells: [] } }) };

      fetch.mockResolvedValue(response);

      await requestSpells()(dispatch);

      expect(dispatch).toBeCalledWith({ type: REQUEST_SPELLS_PENDING });
    });

    it('should request data from /api/spells', async () => {
      const dispatch = jest.fn();
      const response = { ok: true, json: () => ({ data: { spells: [] } }) };

      fetch.mockResolvedValue(response);

      await requestSpells()(dispatch);

      expect(fetch).toBeCalledWith(SPELLS_API_URL);
    });

    describe('when the API request succeeds', () => {
      it('should dispatch REQUEST_SPELLS_SUCCESS', async () => {
        const dispatch = jest.fn();
        const json = {
          ok: true,
          data: {
            spells: underscoreKeys(spellsData),
          },
        };
        const response = { ok: true, json: () => json };
        const expected = requestSpellsSuccess(spellsData);

        fetch.mockResolvedValue(response);

        await requestSpells()(dispatch);

        expect(dispatch).toBeCalledWith(expected);
      });
    });

    describe('when the API request fails', () => {
      it('should dispatch REQUEST_SPELLS_FAILURE', async () => {
        const dispatch = jest.fn();
        const response = { ok: false };

        fetch.mockResolvedValue(response);

        await requestSpells()(dispatch);

        expect(dispatch).toBeCalledWith({ type: REQUEST_SPELLS_FAILURE });
      });
    });
  });
});
