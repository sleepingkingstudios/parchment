import { useDispatch, useStore } from 'react-redux';

import generateHooks from './hooks';

jest.mock('react-redux');

const dispatch = jest.fn();
const getState = jest.fn();
const store = { getState };

useDispatch.mockImplementation(() => dispatch);
useStore.mockImplementation(() => store);

describe('API endpoint hooks', () => {
  const requestHandler = jest.fn();
  const performRequest = jest.fn(() => requestHandler);
  const selector = state => state.api.endpoint;
  const hooks = generateHooks({ performRequest, selector });
  const { useDeleteData } = hooks;

  describe('useDeleteData()', () => {
    it('should be a function', () => {
      expect(typeof useDeleteData === 'function').toBe(true);
    });

    it('should return a function', () => {
      expect(typeof useDeleteData() === 'function').toBe(true);
    });

    describe('with no arguments', () => {
      const requestHook = useDeleteData();

      it('should call performRequest with dispatch and getState', () => {
        requestHook();

        expect(performRequest).toHaveBeenCalled();
        expect(requestHandler).toHaveBeenCalledWith(dispatch, getState);
      });
    });

    describe('with request params', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const params = { wildcards: { id } };
      const requestHook = useDeleteData(params);

      it('should call performRequest with dispatch and getState', () => {
        requestHook();

        expect(performRequest).toHaveBeenCalledWith(params);
        expect(requestHandler).toHaveBeenCalledWith(dispatch, getState);
      });
    });
  });
});
