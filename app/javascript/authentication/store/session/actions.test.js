import {
  CLEAR_TOKEN,
  SET_TOKEN,
  clearToken,
  setToken,
} from './actions';

describe('Session store actions', () => {
  describe('CLEAR_TOKEN', () => {
    it('should define the namespaced action', () => {
      expect(CLEAR_TOKEN).toEqual('authentication/session/clearToken');
    });
  });

  describe('SET_TOKEN', () => {
    it('should define the namespaced action', () => {
      expect(SET_TOKEN).toEqual('authentication/session/setToken');
    });
  });

  describe('clearToken()', () => {
    it('should be a function', () => {
      expect(typeof clearToken).toEqual('function');
    });

    it('should create the action', () => {
      const action = clearToken();

      expect(action).toEqual({
        type: CLEAR_TOKEN,
        payload: {},
      });
    });
  });

  describe('setToken()', () => {
    it('should be a function', () => {
      expect(typeof setToken).toEqual('function');
    });

    it('should create the action', () => {
      const token = 'a.b.c';
      const action = setToken(token);

      expect(action).toEqual({
        type: SET_TOKEN,
        payload: { token },
      });
    });
  });
});
