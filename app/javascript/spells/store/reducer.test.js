import reducer from './reducer';
import initialState from './initialState';
import {
  requestCreateSpellFailure,
  requestCreateSpellPending,
  requestCreateSpellSuccess,
  requestFindSpellFailure,
  requestFindSpellPending,
  requestFindSpellSuccess,
  requestSpellsFailure,
  requestSpellsPending,
  requestSpellsSuccess,
  updateSpellFormField,
} from './actions';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/requestStatus';
import { spellDefaultAttributes } from '../entities';
import { spellsData } from '../fixtures';

describe('Spells reducer', () => {
  describe('when REQUEST_CREATE_SPELL_FAILURE is dispatched', () => {
    const initialErrors = { name: ["can't be blank"] };
    const state = { ...initialState, draftSpellErrors: initialErrors };

    it('should mark the request as failed', () => {
      const errors = {
        name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
      };
      const action = requestCreateSpellFailure(errors);
      const expected = Object.assign({}, state, {
        createSpellRequestStatus: FAILURE,
        draftSpellErrors: errors,
      });

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('when REQUEST_CREATE_SPELL_PENDING is dispatched', () => {
    it('should mark the request as failed', () => {
      const action = requestCreateSpellPending();
      const expected = Object.assign({}, initialState, {
        createSpellRequestStatus: PENDING,
      });

      expect(reducer(initialState, action)).toEqual(expected);
    });
  });

  describe('when REQUEST_CREATE_SPELL_SUCCESS is dispatched', () => {
    const initialErrors = { name: ["can't be blank"] };
    const state = {
      ...initialState,
      draftSpell: spellsData[0],
      draftSpellErrors: initialErrors,
    };

    it('should mark the request as successful', () => {
      const action = requestCreateSpellSuccess();
      const expected = Object.assign({}, state, {
        createSpellRequestStatus: SUCCESS,
        draftSpell: spellDefaultAttributes,
        draftSpellErrors: {},
      });

      expect(reducer(state, action)).toEqual(expected);
    });
  });

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

  describe('when UPDATE_SPELL_FORM_FIELD is dispatched', () => {
    it('should update the spell draft', () => {
      const propName = 'name';
      const value = 'Spontaneous Combustion';
      const action = updateSpellFormField({ propName, value });
      const draft = Object.assign({}, initialState.draftSpell, { name: value });
      const expected = Object.assign(
        {},
        initialState,
        {
          draftSpell: draft,
        },
      );

      expect(reducer(initialState, action)).toEqual(expected);
    });
  });
});
