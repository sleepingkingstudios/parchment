import middleware from './setSession';
import { setSession } from '../session/actions';

describe('LoginForm store setSession middleware', () => {
  const { handleSuccess } = middleware;

  describe('handleSuccess()', () => {
    const next = jest.fn();
    const getState = jest.fn();
    const token = 'a.b.c';
    const user = {
      id: '00000000-0000-0000-0000-000000000000',
      emailAddress: 'alan.bradley@example.com',
      role: 'user',
      username: 'Alan Bradley',
    };
    const response = { ok: true, json: { data: { token, user } } };

    it('should be a function', () => {
      expect(typeof handleSuccess).toEqual('function');
    });

    it('should return a function', () => {
      expect(typeof handleSuccess(next)).toEqual('function');
    });

    it('should call the next function', () => {
      const dispatch = jest.fn();

      handleSuccess(next)({ dispatch, getState, response });

      expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
    });

    it('should dispatch a setSession action', () => {
      const dispatch = jest.fn();
      const expected = setSession({ token, user });

      handleSuccess(next)({ dispatch, getState, response });

      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
