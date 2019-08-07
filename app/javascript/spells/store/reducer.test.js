import reducer from './reducer';
import initialState from './initialState';
import {
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
