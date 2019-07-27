import {
  REQUEST_FAILURE,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  requestFailure,
  requestPending,
  requestSuccess,
} from './actions';
import { spellsData } from '../../fixtures';

describe('Create Spell actions', () => {
  describe('REQUEST_FAILURE', () => {
    it('should define the action', () => {
      expect(REQUEST_FAILURE).toEqual('spells/create/requestFailure');
    });
  });

  describe('REQUEST_PENDING', () => {
    it('should define the action', () => {
      expect(REQUEST_PENDING).toEqual('spells/create/requestPending');
    });
  });

  describe('REQUEST_SUCCESS', () => {
    it('should define the action', () => {
      expect(REQUEST_SUCCESS).toEqual('spells/create/requestSuccess');
    });
  });

  describe('requestFailure', () => {
    it('should be a function', () => {
      expect(typeof requestFailure).toEqual('function');
    });

    it('should create the action', () => {
      const errors = {
        name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
      };
      const action = requestFailure(errors);

      expect(action).toEqual({
        type: REQUEST_FAILURE,
        payload: { errors },
      });
    });
  });

  describe('requestPending', () => {
    it('should be a function', () => {
      expect(typeof requestPending).toEqual('function');
    });

    it('should create the action', () => {
      const action = requestPending();

      expect(action).toEqual({ type: REQUEST_PENDING, payload: {} });
    });
  });

  describe('requestSuccess', () => {
    it('should be a function', () => {
      expect(typeof requestSuccess).toEqual('function');
    });

    it('should create the action', () => {
      const data = spellsData[0];
      const action = requestSuccess(data);

      expect(action).toEqual({
        type: REQUEST_SUCCESS,
        payload: { data },
      });
    });
  });
});
