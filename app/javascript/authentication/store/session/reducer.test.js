import reducer from './reducer';
import {
  clearToken,
  setToken,
} from './actions';
import initialState from './initialState';

describe('Session store reducer', () => {
  describe('reducer', () => {
    it('should be a function', () => {
      expect(typeof reducer).toEqual('function');
    });
  });

  describe('initial state', () => {
    it('should set the initial state', () => {
      const action = { type: 'test/unknownAction' };

      expect(reducer(undefined, action)).toEqual(initialState);
    });
  });

  describe('when CLEAR_TOKEN is dispatched', () => {
    it('should clear the token', () => {
      const state = { ...initialState };
      const action = clearToken();
      const expected = Object.assign({}, state, { token: '' });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the session token is set', () => {
      const previousToken = 'd.e.f';

      it('should clear the token', () => {
        const state = { ...initialState, token: previousToken };
        const action = clearToken();
        const expected = Object.assign({}, state, { token: '' });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when SET_TOKEN is dispatched', () => {
    const token = 'a.b.c';

    it('should set the token', () => {
      const state = { ...initialState };
      const action = setToken(token);
      const expected = Object.assign({}, state, { token });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the session token is set', () => {
      const previousToken = 'd.e.f';

      it('should set the token', () => {
        const state = { ...initialState, token: previousToken };
        const action = setToken(token);
        const expected = Object.assign({}, state, { token });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });
});
