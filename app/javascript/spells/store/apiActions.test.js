import fetch from 'cross-fetch';

import {
  SPELLS_API_URL,
  requestFindSpell,
  requestSpells,
} from './apiActions';
import {
  REQUEST_FIND_SPELL_FAILURE,
  REQUEST_FIND_SPELL_PENDING,
  REQUEST_SPELLS_FAILURE,
  REQUEST_SPELLS_PENDING,
  requestFindSpellSuccess,
  requestSpellsSuccess,
} from './actions';
import { spellsData } from '../fixtures';
import {
  underscoreKeys,
} from '../../utils/object';

jest.mock('cross-fetch');

describe('Spells API actions', () => {
  describe('requestFindSpell()', () => {
    it('should be a function', () => {
      expect(typeof requestFindSpell).toEqual('function');
    });

    it('should return a function', () => {
      expect(typeof requestFindSpell()).toEqual('function');
    });

    describe('when the spell is not in the state', () => {
      it('should dispatch REQUEST_FIND_SPELL_PENDING', async () => {
        const dispatch = jest.fn();
        const spellId = '00000000-0000-0000-0000-000000000000';
        const response = { ok: true, json: () => ({ data: { spell: {} } }) };

        fetch.mockResolvedValue(response);

        await requestFindSpell(spellId)(dispatch);

        expect(dispatch).toBeCalledWith({ type: REQUEST_FIND_SPELL_PENDING });
      });

      it('should request data from /api/spells/id', async () => {
        const dispatch = jest.fn();
        const spellId = '00000000-0000-0000-0000-000000000000';
        const response = { ok: true, json: () => ({ data: { spell: {} } }) };
        const url = `${SPELLS_API_URL}/${spellId}`;

        fetch.mockResolvedValue(response);

        await requestFindSpell(spellId)(dispatch);

        expect(fetch).toBeCalledWith(url);
      });

      describe('when the API request succeeds', () => {
        it('should dispatch REQUEST_FIND_SPELL_SUCCESS', async () => {
          const dispatch = jest.fn();
          const spell = spellsData[0];
          const json = {
            ok: true,
            data: {
              spell: underscoreKeys(spell),
            },
          };
          const response = { ok: true, json: () => json };
          const expected = requestFindSpellSuccess(spell);

          fetch.mockResolvedValue(response);

          await requestFindSpell(spell.id)(dispatch);

          expect(dispatch).toBeCalledWith(expected);
        });
      });

      describe('when the API request fails', () => {
        it('should dispatch REQUEST_FIND_SPELL_FAILURE', async () => {
          const dispatch = jest.fn();
          const spellId = '00000000-0000-0000-0000-000000000000';
          const response = { ok: false };

          fetch.mockResolvedValue(response);

          await requestFindSpell(spellId)(dispatch);

          expect(dispatch).toBeCalledWith({ type: REQUEST_FIND_SPELL_FAILURE });
        });
      });
    });
  });

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
