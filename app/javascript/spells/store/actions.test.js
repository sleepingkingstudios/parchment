import {
  REQUEST_FIND_SPELL_FAILURE,
  REQUEST_FIND_SPELL_PENDING,
  REQUEST_FIND_SPELL_SUCCESS,
  REQUEST_SPELLS_FAILURE,
  REQUEST_SPELLS_PENDING,
  REQUEST_SPELLS_SUCCESS,
  UPDATE_SPELL_FORM_FIELD,
  requestFindSpellFailure,
  requestFindSpellPending,
  requestFindSpellSuccess,
  requestSpellsFailure,
  requestSpellsPending,
  requestSpellsSuccess,
  updateSpellFormField,
} from './actions';
import { spellsData } from '../fixtures';

describe('Spells actions', () => {
  describe('REQUEST_FIND_SPELL_FAILURE', () => {
    it('should define the action', () => {
      expect(REQUEST_FIND_SPELL_FAILURE).toEqual('spells/requestFindSpellFailure');
    });
  });

  describe('REQUEST_FIND_SPELL_PENDING', () => {
    it('should define the action', () => {
      expect(REQUEST_FIND_SPELL_PENDING).toEqual('spells/requestFindSpellPending');
    });
  });

  describe('REQUEST_FIND_SPELL_SUCCESS', () => {
    it('should define the action', () => {
      expect(REQUEST_FIND_SPELL_SUCCESS).toEqual('spells/requestFindSpellSuccess');
    });
  });

  describe('REQUEST_SPELLS_FAILURE', () => {
    it('should define the action', () => {
      expect(REQUEST_SPELLS_FAILURE).toEqual('spells/requestSpellsFailure');
    });
  });

  describe('REQUEST_SPELLS_PENDING', () => {
    it('should define the action', () => {
      expect(REQUEST_SPELLS_PENDING).toEqual('spells/requestSpellsPending');
    });
  });

  describe('REQUEST_SPELLS_SUCCESS', () => {
    it('should define the action', () => {
      expect(REQUEST_SPELLS_SUCCESS).toEqual('spells/requestSpellsSuccess');
    });
  });

  describe('UPDATE_SPELL_FORM_FIELD', () => {
    it('should define the action', () => {
      expect(UPDATE_SPELL_FORM_FIELD).toEqual('spells/updateSpellFormField');
    });
  });

  describe('requestFindSpellFailure', () => {
    it('should be a function', () => {
      expect(typeof requestFindSpellFailure).toEqual('function');
    });

    it('should create the action', () => {
      const action = requestFindSpellFailure();

      expect(action).toEqual({ type: REQUEST_FIND_SPELL_FAILURE });
    });
  });

  describe('requestFindSpellPending', () => {
    it('should be a function', () => {
      expect(typeof requestFindSpellPending).toEqual('function');
    });

    it('should create the action', () => {
      const action = requestFindSpellPending();

      expect(action).toEqual({ type: REQUEST_FIND_SPELL_PENDING });
    });
  });

  describe('requestFindSpellSuccess', () => {
    it('should be a function', () => {
      expect(typeof requestFindSpellSuccess).toEqual('function');
    });

    it('should create the action', () => {
      const spell = spellsData[0];
      const action = requestFindSpellSuccess(spell);

      expect(action).toEqual({
        type: REQUEST_FIND_SPELL_SUCCESS,
        payload: { spell },
      });
    });
  });

  describe('requestSpellsFailure', () => {
    it('should be a function', () => {
      expect(typeof requestSpellsFailure).toEqual('function');
    });

    it('should create the action', () => {
      const action = requestSpellsFailure();

      expect(action).toEqual({ type: REQUEST_SPELLS_FAILURE });
    });
  });

  describe('requestSpellsPending', () => {
    it('should be a function', () => {
      expect(typeof requestSpellsPending).toEqual('function');
    });

    it('should create the action', () => {
      const action = requestSpellsPending();

      expect(action).toEqual({ type: REQUEST_SPELLS_PENDING });
    });
  });

  describe('requestSpellsSuccess', () => {
    it('should be a function', () => {
      expect(typeof requestSpellsSuccess).toEqual('function');
    });

    it('should create the action', () => {
      const action = requestSpellsSuccess(spellsData);

      expect(action).toEqual({
        type: REQUEST_SPELLS_SUCCESS,
        payload: {
          spells: spellsData,
        },
      });
    });
  });

  describe('updateSpellFormField', () => {
    it('should be a function', () => {
      expect(typeof updateSpellFormField).toEqual('function');
    });

    it('should create the action', () => {
      const propName = 'name';
      const value = 'Spontaneous Combustion';
      const action = updateSpellFormField({ propName, value });

      expect(action).toEqual({
        type: UPDATE_SPELL_FORM_FIELD,
        payload: {
          propName,
          value,
        },
      });
    });
  });
});
