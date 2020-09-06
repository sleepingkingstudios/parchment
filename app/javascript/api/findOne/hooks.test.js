import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import generateHooks from './hooks';

jest.mock('react');
jest.mock('react-redux');

const dispatch = jest.fn();
const getState = jest.fn();
const store = { getState };

useSelector.mockImplementation(fn => fn);
useDispatch.mockImplementation(() => dispatch);
useEffect.mockImplementation(fn => fn());
useStore.mockImplementation(() => store);

describe('API endpoint hooks', () => {
  const requestHandler = jest.fn();
  const performRequest = jest.fn(() => requestHandler);
  const selector = state => state.api.endpoint;
  const hooks = generateHooks({ performRequest, selector });
  const {
    useEndpoint,
    useRequestData,
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

  describe('useRequestData()', () => {
    it('should be a function', () => {
      expect(typeof useRequestData === 'function').toBe(true);
    });

    it('should return a function', () => {
      expect(typeof useRequestData() === 'function').toBe(true);
    });

    describe('with no arguments', () => {
      const requestHook = useRequestData();

      it('should call useEffect()', () => {
        requestHook();

        expect(useEffect).toHaveBeenCalledWith(
          expect.any(Function),
          [],
        );
      });

      it('should call performRequest with dispatch and getState', () => {
        requestHook();

        expect(performRequest).toHaveBeenCalled();
        expect(requestHandler).toHaveBeenCalledWith(dispatch, getState);
      });
    });

    describe('with request params', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const params = { wildcards: { id } };
      const requestHook = useRequestData(params);

      it('should call useEffect()', () => {
        requestHook();

        expect(useEffect).toHaveBeenCalledWith(
          expect.any(Function),
          [],
        );
      });

      it('should call performRequest with dispatch and getState', () => {
        requestHook();

        expect(performRequest).toHaveBeenCalledWith(params);
        expect(requestHandler).toHaveBeenCalledWith(dispatch, getState);
      });
    });

    describe('with a skip array', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const params = {};
      const skip = [{ id }];
      const requestHook = useRequestData(params, skip);

      it('should call useEffect()', () => {
        requestHook();

        expect(useEffect).toHaveBeenCalledWith(
          expect.any(Function),
          skip,
        );
      });

      it('should call performRequest with dispatch and getState', () => {
        requestHook();

        expect(performRequest).toHaveBeenCalledWith(params);
        expect(requestHandler).toHaveBeenCalledWith(dispatch, getState);
      });
    });
  });
});
