import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { clearSession as clearSessionAction } from './actions';
import {
  useClearSession,
  useSession,
} from './hooks';
import selector from './selector';

jest.mock('react');
jest.mock('react-redux');

useDispatch.mockImplementation(jest.fn(() => () => {}));
useSelector.mockImplementation(fn => fn);

describe('Session store hooks', () => {
  const session = { token: 'a.b.c' };
  const state = { authentication: { session } };

  describe('useClearSession()', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      useDispatch.mockImplementationOnce(() => dispatch);
    });

    it('should be a function', () => {
      expect(typeof useClearSession === 'function').toBe(true);
    });

    it('should return a function', () => {
      expect(typeof useClearSession() === 'function').toBe(true);
    });

    it('should call useDispatch()', () => {
      useClearSession();

      expect(useDispatch).toHaveBeenCalled();
    });

    it('should dispatch a clearSession action', () => {
      const action = clearSessionAction();
      const clearSession = useClearSession();

      clearSession();

      expect(dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('useSession()', () => {
    it('should be a function', () => {
      expect(typeof useSession === 'function').toBe(true);
    });

    it('should return a function', () => {
      expect(typeof useSession() === 'function').toBe(true);
    });

    describe('with no arguments', () => {
      it('should return the selected state', () => {
        expect(useSession()(state)).toEqual(selector(state));
      });
    });

    describe('with a function', () => {
      it('should call the function with the selected state', () => {
        const fn = jest.fn(({ token }) => token);
        const expected = selector(state).token;

        expect(useSession(fn)(state)).toEqual(expected);

        expect(fn).toHaveBeenCalledWith(selector(state));
      });
    });
  });
});
