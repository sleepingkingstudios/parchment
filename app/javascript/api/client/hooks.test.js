import { useEffect } from 'react';
import {
  shallowEqual,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';

import { PENDING } from 'api/status';
import generateHooks from './hooks';

jest.mock('react');
jest.mock('react-redux');

const dispatch = jest.fn();
const getState = jest.fn();
const store = { getState };

useDispatch.mockImplementation(() => dispatch);
useEffect.mockImplementation(fn => fn());
useSelector.mockImplementation(() => null);
useStore.mockImplementation(() => store);

describe('API client hooks', () => {
  const requestHandler = jest.fn();
  const performRequest = jest.fn(() => requestHandler);
  const namespace = 'path/to/widgets';
  const hooks = generateHooks({
    namespace,
    performRequest,
  });
  const {
    usePerformRequest,
    useRequest,
    useStatus,
  } = hooks;

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
      const requestHook = usePerformRequest(params);

      it('should call useEffect()', () => {
        requestHook();

        expect(useEffect).toHaveBeenCalled();
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
      const requestHook = usePerformRequest(params, skip);

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

  describe('useRequest()', () => {
    it('should be a function', () => {
      expect(typeof useRequest === 'function').toBe(true);
    });

    it('should return a function', () => {
      expect(typeof useRequest() === 'function').toBe(true);
    });

    describe('with no arguments', () => {
      const request = useRequest();

      it('should call performRequest with dispatch and getState', () => {
        request();

        expect(performRequest).toHaveBeenCalled();
        expect(requestHandler).toHaveBeenCalledWith(dispatch, getState);
      });
    });

    describe('with request params', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const params = { wildcards: { id } };
      const request = useRequest(params);

      it('should call performRequest with dispatch and getState', () => {
        request();

        expect(performRequest).toHaveBeenCalledWith(params);
        expect(requestHandler).toHaveBeenCalledWith(dispatch, getState);
      });
    });
  });

  describe('useStatus()', () => {
    const status = PENDING;
    const state = { path: { to: { widgets: { status } } } };

    beforeEach(() => {
      useSelector.mockImplementationOnce(selector => selector(state));
    });

    it('should be a function', () => {
      expect(typeof useStatus).toEqual('function');
    });

    it('should delegate to useSelector()', () => {
      useStatus();

      expect(useSelector).toHaveBeenCalledWith(
        expect.any(Function),
        shallowEqual,
      );
    });

    it('should return the request status', () => {
      expect(useStatus()).toEqual(status);
    });
  });
});
