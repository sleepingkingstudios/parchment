import reducer from './reducer';
import {
  clearSession,
  setSession,
} from './actions';
import initialState from './initialState';
import { buildUser } from '../../entities';

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

  describe('when CLEAR_SESSION is dispatched', () => {
    it('should clear the token', () => {
      const state = { ...initialState };
      const action = clearSession();
      const expected = Object.assign({}, state, { token: '', user: buildUser() });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the session is set', () => {
      const previousToken = 'd.e.f';
      const previousUser = {
        id: '00000000-0000-0000-0000-000000000001',
        emailAddress: 'kevin.flynn@example.com',
        role: 'user',
        username: 'Kevin Flynn',
      };

      it('should clear the token', () => {
        const state = { ...initialState, token: previousToken, user: previousUser };
        const action = clearSession();
        const expected = Object.assign({}, state, { token: '', user: buildUser() });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when SET_TOKEN is dispatched', () => {
    const token = 'a.b.c';
    const user = {
      id: '00000000-0000-0000-0000-000000000000',
      emailAddress: 'alan.bradley@example.com',
      role: 'user',
      username: 'Alan Bradley',
    };

    it('should set the token and user', () => {
      const state = { ...initialState };
      const action = setSession({ token, user });
      const expected = Object.assign({}, state, { token, user });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the session token is set', () => {
      const previousToken = 'd.e.f';
      const previousUser = {
        id: '00000000-0000-0000-0000-000000000001',
        emailAddress: 'kevin.flynn@example.com',
        role: 'user',
        username: 'Kevin Flynn',
      };

      it('should set the token', () => {
        const state = { ...initialState, token: previousToken, user: previousUser };
        const action = setSession({ token, user });
        const expected = Object.assign({}, state, { token, user });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });
});
