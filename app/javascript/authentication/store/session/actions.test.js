import {
  CLEAR_SESSION,
  SET_SESSION,
  clearSession,
  setSession,
} from './actions';

describe('Session store actions', () => {
  describe('CLEAR_SESSION', () => {
    it('should define the namespaced action', () => {
      expect(CLEAR_SESSION).toEqual('authentication/session/clearSession');
    });
  });

  describe('SET_SESSION', () => {
    it('should define the namespaced action', () => {
      expect(SET_SESSION).toEqual('authentication/session/setSession');
    });
  });

  describe('clearSession()', () => {
    it('should be a function', () => {
      expect(typeof clearSession).toEqual('function');
    });

    it('should create the action', () => {
      const action = clearSession();

      expect(action).toEqual({
        type: CLEAR_SESSION,
        payload: {},
      });
    });
  });

  describe('setSession()', () => {
    it('should be a function', () => {
      expect(typeof setSession).toEqual('function');
    });

    it('should create the action', () => {
      const token = 'a.b.c';
      const user = {
        id: '00000000-0000-0000-0000-000000000000',
        emailAddress: 'alan.bradley@example.com',
        role: 'user',
        username: 'Alan Bradley',
      };
      const action = setSession({ token, user });

      expect(action).toEqual({
        type: SET_SESSION,
        payload: { token, user },
      });
    });
  });
});
