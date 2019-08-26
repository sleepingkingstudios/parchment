import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import generateHooks from './hooks';

jest.mock('react');
jest.mock('react-redux');

const dispatch = jest.fn();

useSelector.mockImplementation(fn => fn);
useDispatch.mockImplementation(() => dispatch);
useEffect.mockImplementation(fn => fn());

describe('API endpoint hooks', () => {
  const requestHandler = jest.fn();
  const performRequest = jest.fn(() => requestHandler);
  const selector = state => state.api.endpoint;
  const hooks = generateHooks({ performRequest, selector });
  const {
    useEndpoint,
    usePerformRequest,
  } = hooks;
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

  describe('usePerformRequest()', () => {
    it('should be a function', () => {
      expect(typeof usePerformRequest === 'function').toBe(true);
    });

    it('should return a function', () => {
      expect(typeof usePerformRequest() === 'function').toBe(true);
    });

    describe('with no arguments', () => {
      const requestHook = usePerformRequest();

      it('should call useEffect()', () => {
        requestHook();

        expect(useEffect).toHaveBeenCalled();
      });

      it('should call performRequest with the dispatch', () => {
        requestHook();

        expect(performRequest).toHaveBeenCalled();
        expect(requestHandler).toHaveBeenCalledWith(dispatch);
      });
    });

    describe('with request params', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const params = { wildcards: { id } };
      const requestHook = usePerformRequest(params);

      it('should call useEffect()', () => {
        requestHook();

        expect(useEffect).toHaveBeenCalled();
      });

      it('should call performRequest with the dispatch', () => {
        requestHook();

        expect(performRequest).toHaveBeenCalledWith(params);
        expect(requestHandler).toHaveBeenCalledWith(dispatch);
      });
    });
  });
});
