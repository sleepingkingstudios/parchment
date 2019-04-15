import {
  REQUEST_SPELLS_PENDING,
  REQUEST_SPELLS_FAILURE,
  REQUEST_SPELLS_SUCCESS,
  requestSpellsFailure,
  requestSpellsPending,
  requestSpellsSuccess,
} from './actions';
import { spellsData } from '../fixtures';

describe('Spells actions', () => {
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
});
