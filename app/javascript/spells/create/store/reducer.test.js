import reducer from './reducer';
import initialState from './initialState';
import {
  requestFailure,
  requestPending,
  requestSuccess,
} from './actions';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../../store/requestStatus';

describe('Create Spell reducer', () => {
  describe('when REQUEST_FAILURE is dispatched', () => {
    it('should mark the request as failed', () => {
      const state = { ...initialState };
      const action = requestFailure();
      const expected = Object.assign({}, state, {
        requestStatus: FAILURE,
      });

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('when REQUEST_PENDING is dispatched', () => {
    it('should mark the request as pending', () => {
      const state = { ...initialState };
      const action = requestPending();
      const expected = Object.assign({}, state, {
        requestStatus: PENDING,
      });

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('when REQUEST_SUCCESS is dispatched', () => {
    it('should mark the request as pending', () => {
      const state = { ...initialState };
      const action = requestSuccess();
      const expected = Object.assign({}, state, {
        requestStatus: SUCCESS,
      });

      expect(reducer(state, action)).toEqual(expected);
    });
  });
});
