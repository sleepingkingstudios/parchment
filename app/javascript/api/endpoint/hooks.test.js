import { useSelector } from 'react-redux';

import generateHooks from './hooks';

jest.mock('react');
jest.mock('react-redux');

useSelector.mockImplementation(fn => fn);

describe('API endpoint hooks', () => {
  const requestHandler = jest.fn();
  const performRequest = jest.fn(() => requestHandler);
  const selector = state => state.api.endpoint;
  const hooks = generateHooks({ performRequest, selector });
  const { useEndpoint } = hooks;
  const state = { api: { endpoint: { data: { key: 'value' } } } };

  describe('useEndpoint()', () => {
    it('should be a function', () => {
      expect(typeof useEndpoint === 'function').toBe(true);
    });

    it('should return a function', () => {
      expect(typeof useEndpoint() === 'function').toBe(true);
    });

    describe('with no arguments', () => {
      it('should return the selected state', () => {
        expect(useEndpoint()(state)).toEqual(selector(state));
      });
    });

    describe('with a function', () => {
      it('should call the function with the selected state', () => {
        const fn = jest.fn(({ data }) => data);
        const expected = selector(state).data;

        expect(useEndpoint(fn)(state)).toEqual(expected);

        expect(fn).toHaveBeenCalledWith(selector(state));
      });
    });
  });
});
