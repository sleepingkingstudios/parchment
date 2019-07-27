import reducer from './reducer';
import initialState from './initialState';
import {
  requestFindSpellFailure,
  requestFindSpellPending,
  requestFindSpellSuccess,
  requestSpellsFailure,
  requestSpellsPending,
  requestSpellsSuccess,
} from './actions';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/requestStatus';
import { spellsData } from '../fixtures';

describe('Spells reducer', () => {
  describe('when REQUEST_FIND_SPELL_FAILURE is dispatched', () => {
    it('should mark the request as failed', () => {
      const action = requestFindSpellFailure();
      const expected = Object.assign({}, initialState, {
        findSpellRequestStatus: FAILURE,
      });

      expect(reducer(initialState, action)).toEqual(expected);
    });

    describe('when there is a spell set', () => {
      const state = Object.assign({}, initialState, { spell: spellsData[0] });

      it('should clear the spell', () => {
        const action = requestFindSpellFailure();
        const expected = Object.assign({}, state, {
          findSpellRequestStatus: FAILURE,
          spell: {},
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when REQUEST_FIND_SPELL_PENDING is dispatched', () => {
    it('should mark the request as failed', () => {
      const action = requestFindSpellPending();
      const expected = Object.assign({}, initialState, {
        findSpellRequestStatus: PENDING,
      });

      expect(reducer(initialState, action)).toEqual(expected);
    });

    describe('when there is a spell set', () => {
      const state = Object.assign({}, initialState, { spell: spellsData[0] });

      it('should clear the spell', () => {
        const action = requestFindSpellPending();
        const expected = Object.assign({}, state, {
          findSpellRequestStatus: PENDING,
          spell: {},
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when REQUEST_FIND_SPELL_SUCCESS is dispatched', () => {
    it('should mark the request as successful and set the spell', () => {
      const spell = spellsData[0];
      const action = requestFindSpellSuccess(spell);
      const expected = Object.assign({}, initialState, {
        findSpellRequestStatus: SUCCESS,
        spell,
      });

      expect(reducer(initialState, action)).toEqual(expected);
    });
  });

  describe('when REQUEST_SPELLS_FAILURE is dispatched', () => {
    it('should mark the request as failed', () => {
      const action = requestSpellsFailure();
      const expected = Object.assign({}, initialState, {
        spellsRequestStatus: FAILURE,
      });

      expect(reducer(initialState, action)).toEqual(expected);
    });

    describe('when there are many spells', () => {
      const state = Object.assign({}, initialState, { spells: spellsData });

      it('should clear the spells', () => {
        const action = requestSpellsFailure();
        const expected = Object.assign({}, state, {
          spells: [],
          spellsRequestStatus: FAILURE,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when REQUEST_SPELLS_PENDING is dispatched', () => {
    it('should mark the request as pending', () => {
      const action = requestSpellsPending();
      const expected = Object.assign({}, initialState, {
        spellsRequestStatus: PENDING,
      });

      expect(reducer(initialState, action)).toEqual(expected);
    });

    describe('when there are many spells', () => {
      const state = Object.assign({}, initialState, { spells: spellsData });

      it('should clear the spells', () => {
        const action = requestSpellsPending();
        const expected = Object.assign({}, state, {
          spells: [],
          spellsRequestStatus: PENDING,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when REQUEST_SPELLS_SUCCESS is dispatched', () => {
    it('should mark the request as successful and set the spells', () => {
      const action = requestSpellsSuccess(spellsData);
      const expected = Object.assign({}, initialState, {
        spells: spellsData,
        spellsRequestStatus: SUCCESS,
      });

      expect(reducer(initialState, action)).toEqual(expected);
    });
  });
});
