/* eslint-env jest */

import { shallowEqual } from 'react-redux';

const generateState = ({ data, namespace }) => (
  namespace.split('/').reverse().reduce(
    (nested, key) => {
      const obj = {};

      obj[key] = nested;

      return obj;
    },
    { data },
  )
);

export const shouldGenerateTheHooks = (options) => {
  const {
    hooks,
    namespace,
    useSelector,
  } = options;
  const { useData } = hooks;

  beforeEach(() => { useSelector.mockClear(); });

  describe('useData()', () => {
    it('should be a function', () => {
      expect(typeof useData).toEqual('function');
    });

    it('should delegate to useSelector()', () => {
      useData();

      expect(useSelector).toHaveBeenCalledWith(
        expect.any(Function),
        shallowEqual,
      );
    });

    describe('when the state does not have data matching the selector', () => {
      beforeEach(() => {
        useSelector.mockImplementationOnce(selector => selector({}));
      });

      it('should return null', () => {
        expect(useData()).toEqual(null);
      });
    });

    describe('when the state has data matching the selector', () => {
      const data = { widgets: [] };
      const state = generateState({ data, namespace });

      beforeEach(() => {
        useSelector.mockImplementationOnce(selector => selector(state));
      });

      it('should return the matching data', () => {
        expect(useData()).toEqual(data);
      });
    });
  });
};

export const shouldGenerateTheReducer = (options) => {
  const {
    actions,
    data,
    reducer,
  } = options;
  const { REQUEST_SUCCESS } = actions;

  it('should be a function', () => {
    expect(typeof reducer).toEqual('function');
  });

  describe('initial state', () => {
    it('should set the initial state', () => {
      const action = { type: 'test/unknownAction' };

      expect(reducer(undefined, action)).toEqual({ data });
    });
  });

  describe('when REQUEST_SUCCESS is dispatched', () => {
    const value = [{ name: 'Inigo Montoya' }];

    it('should set the data', () => {
      const state = { ...data };
      const action = { type: REQUEST_SUCCESS, payload: { data: value } };
      const expected = Object.assign({}, data, { data: value });

      expect(reducer(state, action)).toEqual(expected);
    });
  });
};
