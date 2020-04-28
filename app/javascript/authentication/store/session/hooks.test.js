import { useSelector } from 'react-redux';

import { useSession } from './hooks';
import selector from './selector';

jest.mock('react');
jest.mock('react-redux');

useSelector.mockImplementation(fn => fn);

describe('Session store hooks', () => {
  const session = { token: 'a.b.c' };
  const state = { authentication: { session } };

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
