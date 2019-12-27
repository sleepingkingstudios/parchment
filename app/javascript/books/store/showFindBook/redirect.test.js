import { push } from 'connected-react-router';

import redirect from './redirect';

describe('ShowFindBook store redirect', () => {
  const { handleFailure } = redirect;

  describe('handleFailure()', () => {
    const getState = jest.fn();
    const response = { ok: false };

    it('should be a function', () => {
      expect(typeof handleFailure).toEqual('function');
    });

    it('should return a function', () => {
      const next = jest.fn();

      expect(typeof handleFailure(next)).toEqual('function');
    });

    it('should call the next function', () => {
      const next = jest.fn();
      const dispatch = jest.fn();

      handleFailure(next)({ dispatch, getState, response });

      expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
    });

    it('should dispatch a push action', () => {
      const next = jest.fn();
      const dispatch = jest.fn();
      const url = '/books';
      const expected = push(url);

      handleFailure(next)({ dispatch, getState, response });

      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
