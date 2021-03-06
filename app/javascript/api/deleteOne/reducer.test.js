import generateActions from '../endpoint/actions';
import generateInitialState from '../endpoint/initialState';
import generateReducer from './reducer';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../status';

describe('Delete one request reducer', () => {
  const namespace = 'deleteWidget';
  const actions = generateActions({ namespace });
  const initialState = generateInitialState({ data: {}, namespace });
  const reducer = generateReducer({ actions, initialState });
  const {
    requestFailure,
    requestPending,
    requestSuccess,
  } = actions;
  const previousErrors = { name: ["can't be blank"] };

  describe('generateReducer', () => {
    it('should be a function', () => {
      expect(typeof generateReducer).toEqual('function');
    });
  });

  describe('initial state', () => {
    it('should set the initial state', () => {
      const action = { type: 'test/unknownAction' };

      expect(reducer(undefined, action)).toEqual(initialState);
    });
  });

  describe('reducer', () => {
    it('should be a function', () => {
      expect(typeof reducer).toEqual('function');
    });
  });

  describe('when REQUEST_FAILURE is dispatched', () => {
    const errors = {
      name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
    };

    it('should mark the request as failing and set the errors', () => {
      const state = { ...initialState };
      const action = requestFailure(errors);
      const expected = Object.assign({}, state, {
        errors,
        status: FAILURE,
      });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has errors', () => {
      it('should mark the request as failed and set the errors', () => {
        const state = { ...initialState, errors: previousErrors };
        const action = requestFailure(errors);
        const expected = Object.assign({}, state, {
          errors,
          status: FAILURE,
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
        status: PENDING,
      });

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('when REQUEST_SUCCESS is dispatched', () => {
    it('should mark the request as passing and clear the errors', () => {
      const state = { ...initialState };
      const action = requestSuccess({});
      const expected = Object.assign({}, state, {
        errors: {},
        status: SUCCESS,
      });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has errors', () => {
      it('should mark the request as passing, set the data, and clear the errors', () => {
        const state = { ...initialState, errors: previousErrors };
        const action = requestSuccess({});
        const expected = Object.assign({}, state, {
          errors: {},
          status: SUCCESS,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });
});
