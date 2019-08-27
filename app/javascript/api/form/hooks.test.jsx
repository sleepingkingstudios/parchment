import { useDispatch, useSelector } from 'react-redux';

import generateHooks from './hooks';

jest.mock('react');
jest.mock('react-redux');

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(fn => fn);

describe('API endpoint hooks', () => {
  const actions = { updateFormField: jest.fn() };
  const requestHandler = jest.fn();
  const performRequest = jest.fn(() => requestHandler);
  const selector = state => state.api.endpoint;
  const hooks = generateHooks({ actions, performRequest, selector });
  const {
    useEndpoint,
    useSubmitForm,
    useUpdateForm,
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

  describe('useSubmitForm()', () => {
    it('should be a function', () => {
      expect(typeof useSubmitForm === 'function').toBe(true);
    });

    it('should return a function', () => {
      expect(typeof useSubmitForm() === 'function').toBe(true);
    });

    describe('with no arguments', () => {
      const instrumentedRequestHandler = jest.fn((...args) => {
        const getState = args[1];

        expect(args).toHaveLength(2);
        expect(args[0]).toBe(dispatch);

        expect(typeof getState).toEqual('function');
        expect(getState.name).toEqual('getState');
        expect(getState()).toEqual(state);
      });
      const instrumentedPerformRequest = jest.fn(() => instrumentedRequestHandler);
      const instrumentedHooks = generateHooks({
        performRequest: instrumentedPerformRequest,
        selector,
      });

      beforeEach(() => {
        useSelector.mockImplementation(fn => fn(state));
      });

      it('should call performRequest with the dispatch and state', () => {
        const submitHook = instrumentedHooks.useSubmitForm();

        expect.assertions(6);

        submitHook();

        expect(instrumentedPerformRequest).toHaveBeenCalled();
      });
    });

    describe('with request params', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const params = { wildcards: { id } };
      const instrumentedRequestHandler = jest.fn((...args) => {
        const getState = args[1];

        expect(args).toHaveLength(2);
        expect(args[0]).toBe(dispatch);

        expect(typeof getState).toEqual('function');
        expect(getState.name).toEqual('getState');
        expect(getState()).toEqual(state);
      });
      const instrumentedPerformRequest = jest.fn(() => instrumentedRequestHandler);
      const instrumentedHooks = generateHooks({
        performRequest: instrumentedPerformRequest,
        selector,
      });

      beforeEach(() => {
        useSelector.mockImplementation(fn => fn(state));
      });

      it('should call performRequest with the dispatch and state', () => {
        const submitHook = instrumentedHooks.useSubmitForm(params);

        expect.assertions(6);

        submitHook();

        expect(instrumentedPerformRequest).toHaveBeenCalledWith(params);
      });
    });
  });

  describe('useUpdateForm()', () => {
    const params = { propName: 'propName', value: 'value' };
    const action = { ...params, type: 'updateForm' };
    const updateHook = useUpdateForm();

    beforeEach(() => {
      actions.updateFormField.mockImplementationOnce(() => action);
    });

    it('should be a function', () => {
      expect(typeof useUpdateForm === 'function').toBe(true);
    });

    it('should return a function', () => {
      expect(typeof useUpdateForm() === 'function').toBe(true);
    });

    it('should create the action from the arguments', () => {
      updateHook(params);

      expect(actions.updateFormField).toHaveBeenCalledWith(params);
    });

    it('should call dispatch with the action', () => {
      updateHook(params);

      expect(dispatch).toHaveBeenCalledWith(action);
    });
  });
});
