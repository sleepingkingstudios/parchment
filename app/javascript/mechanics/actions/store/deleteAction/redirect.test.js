import { push } from 'connected-react-router';

import redirect from './redirect';

describe('DeleteAction store redirect', () => {
  const { handleSuccess } = redirect;

  describe('handleSuccess()', () => {
    const getState = jest.fn();
    const response = { ok: true };

    it('should be a function', () => {
      expect(typeof handleSuccess).toEqual('function');
    });

    it('should return a function', () => {
      const next = jest.fn();

      expect(typeof handleSuccess(next)).toEqual('function');
    });

    it('should call the next function', () => {
      const next = jest.fn();
      const dispatch = jest.fn();

      handleSuccess(next)({ dispatch, getState, response });

      expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
    });

    it('should dispatch a push action', () => {
      const next = jest.fn();
      const dispatch = jest.fn();
      const url = '/mechanics/actions';
      const expected = push(url);

      handleSuccess(next)({ dispatch, getState, response });

      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
