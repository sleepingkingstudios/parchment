import middleware from './setToken';
import { setToken } from '../session/actions';

describe('LoginForm store setToken middleware', () => {
  const { handleSuccess } = middleware;

  describe('handleSuccess()', () => {
    const next = jest.fn();
    const getState = jest.fn();

    it('should be a function', () => {
      expect(typeof handleSuccess).toEqual('function');
    });

    it('should return a function', () => {
      expect(typeof handleSuccess(next)).toEqual('function');
    });

    it('should call the next function', () => {
      const response = { ok: false, json: {} };
      const dispatch = jest.fn();

      handleSuccess(next)({ dispatch, getState, response });

      expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
    });

    it('should dispatch a setToken action', () => {
      const token = 'a.b.c';
      const response = { ok: false, json: { data: { token } } };
      const dispatch = jest.fn();
      const expected = setToken(token);

      handleSuccess(next)({ dispatch, getState, response });

      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
