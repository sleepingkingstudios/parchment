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
  const initialErrors = { name: ["can't be blank"] };

  describe('when REQUEST_FAILURE is dispatched', () => {
    it('should mark the request as failed and set the errors', () => {
      const state = { ...initialState };
      const errors = {
        name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
      };
      const action = requestFailure(errors);
      const expected = Object.assign({}, state, {
        errors,
        requestStatus: FAILURE,
      });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has errors', () => {
      it('should mark the request as failed and set the errors', () => {
        const state = { ...initialState, errors: initialErrors };
        const errors = {
          name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
        };
        const action = requestFailure(errors);
        const expected = Object.assign({}, state, {
          errors,
          requestStatus: FAILURE,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
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
    it('should mark the request as pending and clear the errors', () => {
      const state = { ...initialState };
      const action = requestSuccess();
      const expected = Object.assign({}, state, {
        errors: {},
        requestStatus: SUCCESS,
      });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has errors', () => {
      const state = { ...initialState, errors: initialErrors };
      const action = requestSuccess();
      const expected = Object.assign({}, state, {
        errors: {},
        requestStatus: SUCCESS,
      });

      expect(reducer(state, action)).toEqual(expected);
    });
  });
});
