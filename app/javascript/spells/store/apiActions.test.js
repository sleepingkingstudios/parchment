import fetch from 'cross-fetch';
import { push } from 'connected-react-router';

import {
  SPELLS_API_URL,
  requestCreateSpell,
  requestFindSpell,
  requestSpells,
} from './apiActions';
import {
  REQUEST_CREATE_SPELL_PENDING,
  REQUEST_FIND_SPELL_FAILURE,
  REQUEST_FIND_SPELL_PENDING,
  REQUEST_SPELLS_FAILURE,
  REQUEST_SPELLS_PENDING,
  requestCreateSpellFailure,
  requestCreateSpellSuccess,
  requestFindSpellSuccess,
  requestSpellsSuccess,
} from './actions';
import { spellsData } from '../fixtures';
import {
  underscoreKeys,
} from '../../utils/object';

jest.mock('cross-fetch');

describe('Spells API actions', () => {
  describe('requestCreateSpell()', () => {
    const buildState = (draftSpell, draftSpellErrors) => (
      { spells: { draftSpell, draftSpellErrors } }
    );

    it('should be a function', () => {
      expect(typeof requestCreateSpell).toEqual('function');
    });

    it('should return a function', () => {
      expect(typeof requestCreateSpell()).toEqual('function');
    });

    it('should dispatch REQUEST_CREATE_SPELL_PENDING', async () => {
      const draftSpell = {};
      const state = buildState(draftSpell);
      const dispatch = jest.fn();
      const getState = jest.fn(() => state);
      const response = { ok: true, json: () => ({ data: {} }) };

      fetch.mockResolvedValue(response);

      await requestCreateSpell()(dispatch, getState);

      expect(dispatch).toBeCalledWith({ type: REQUEST_CREATE_SPELL_PENDING });
    });

    it('should post the draft spell to /api/spells', async () => {
      const draftSpell = spellsData[0];
      const state = buildState(draftSpell);
      const dispatch = jest.fn();
      const getState = jest.fn(() => state);
      const response = { ok: true, json: () => ({ data: {} }) };
      const method = 'POST';
      const body = JSON.stringify(underscoreKeys(draftSpell));
      const headers = { 'Content-Type': 'application/json' };
      const options = { method, body, headers };

      fetch.mockResolvedValue(response);

      await requestCreateSpell()(dispatch, getState);

      expect(fetch).toBeCalledWith(SPELLS_API_URL, options);
    });

    describe('when the API request succeeds', () => {
      it('should dispatch REQUEST_CREATE_SPELL_SUCCESS', async () => {
        const draftSpell = {};
        const state = buildState(draftSpell);
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const json = {
          ok: true,
          data: {},
        };
        const response = { ok: true, json: () => json };
        const expected = requestCreateSpellSuccess();

        fetch.mockResolvedValue(response);

        await requestCreateSpell()(dispatch, getState);

        expect(dispatch).toBeCalledWith(expected);
      });

      it('should redirect to the show spell page', async () => {
        const id = '00000000-0000-0000-0000-000000000000';
        const draftSpell = { id };
        const state = buildState(draftSpell);
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const json = {
          ok: true,
          data: { spell: draftSpell },
        };
        const response = { ok: true, json: () => json };
        const expected = push(`/spells/${id}`);

        fetch.mockResolvedValue(response);

        await requestCreateSpell()(dispatch, getState);

        expect(dispatch).toBeCalledWith(expected);
      });
    });

    describe('when the API request fails', () => {
      it('should dispatch REQUEST_CREATE_SPELL_FAILURE', async () => {
        const draftSpell = {};
        const state = buildState(draftSpell);
        const dispatch = jest.fn();
        const getState = jest.fn(() => state);
        const errors = [
          ['name', 'is Inigo Montoya'],
          ['name', 'you kill my father'],
          ['name', 'prepare to die'],
        ];
        const expectedErrors = {
          name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
        };
        const json = {
          ok: false,
          errors,
        };
        const response = { ok: false, json: () => json };
        const expected = requestCreateSpellFailure(expectedErrors);

        fetch.mockResolvedValue(response);

        await requestCreateSpell()(dispatch, getState);

        expect(dispatch).toBeCalledWith(expected);
      });
    });
  });

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
