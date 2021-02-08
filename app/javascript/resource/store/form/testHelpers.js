/* eslint-env jest */

import { shallowEqual } from 'react-redux';

import { assign } from 'utils/object';

const generateState = ({ data, errors, namespace }) => (
  namespace.split('/').reverse().reduce(
    (nested, key) => {
      const obj = {};

      obj[key] = nested;

      return obj;
    },
    { data, errors },
  )
);

export const shouldGenerateTheActions = ({ actions, namespace }) => {
  const {
    UPDATE_FORM_DATA,
    updateFormData,
  } = actions;

  describe('UPDATE_FORM_DATA', () => {
    it('should define the action', () => {
      expect(UPDATE_FORM_DATA).toEqual(`${namespace}/updateFormData`);
    });
  });

  describe('updateFormData', () => {
    it('should be a function', () => {
      expect(typeof updateFormData).toEqual('function');
    });

    it('should create the action', () => {
      const data = {
        name: 'Stem Bolt',
        type: 'Self-Sealing',
      };
      const action = updateFormData({ data });

      expect(action).toEqual({
        type: UPDATE_FORM_DATA,
        payload: {
          path: [],
          data,
        },
      });
    });

    describe('with path: array', () => {
      it('should create the action', () => {
        const path = ['items', 'tradeGoods', 'technical'];
        const data = {
          name: 'Stem Bolt',
          type: 'Self-Sealing',
        };
        const action = updateFormData({ data, path });

        expect(action).toEqual({
          type: UPDATE_FORM_DATA,
          payload: {
            path,
            data,
          },
        });
      });
    });

    describe('with path: value', () => {
      it('should create the action', () => {
        const path = 'items';
        const data = {
          name: 'Stem Bolt',
          type: 'Self-Sealing',
        };
        const action = updateFormData({ data, path });

        expect(action).toEqual({
          type: UPDATE_FORM_DATA,
          payload: {
            path: [path],
            data,
          },
        });
      });
    });
  });
};

export const shouldGenerateTheHooks = (options) => {
  const {
    actions,
    hooks,
    namespace,
    useDispatch,
    useSelector,
  } = options;
  const {
    useForm,
    useUpdateForm,
  } = hooks;

  beforeEach(() => { useSelector.mockClear(); });

  describe('useForm()', () => {
    it('should be a function', () => {
      expect(typeof useForm).toEqual('function');
    });

    it('should delegate to useSelector()', () => {
      useForm();

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
        expect(useForm()).toEqual(null);
      });
    });

    describe('when the state has data matching the selector', () => {
      const data = { widget: {} };
      const errors = { widget: 'is useless' };
      const state = generateState({ data, errors, namespace });

      beforeEach(() => {
        useSelector.mockImplementationOnce(selector => selector(state));
      });

      it('should return the matching data', () => {
        expect(useForm()).toEqual({ data, errors });
      });
    });
  });

  describe('useUpdateForm()', () => {
    const { updateFormData } = actions;

    const dispatch = useDispatch();
    const data = { name: 'Self-Sealing Stem Bolt' };
    const action = updateFormData(data);
    const updateForm = useUpdateForm();

    it('should be a function', () => {
      expect(typeof useUpdateForm).toEqual('function');
    });

    it('should return a function', () => {
      expect(typeof updateForm).toEqual('function');
    });

    it('should pass the action to dispatch()', () => {
      updateForm(data);

      expect(dispatch).toHaveBeenCalledWith(action);
    });
  });
};

export const shouldGenerateTheReducer = (options) => {
  const {
    actions,
    data,
    errors,
    reducer,
    submitActions,
  } = options;
  const { updateFormData } = actions;
  const initialState = { data, errors };

  it('should be a function', () => {
    expect(typeof reducer).toEqual('function');
  });

  describe('initial state', () => {
    it('should set the initial state', () => {
      const action = { type: 'test/unknownAction' };

      expect(reducer(undefined, action)).toEqual(initialState);
    });
  });

  describe('when REQUEST_FAILURE is dispatched', () => {
    const { requestFailure } = submitActions;
    const updatedErrors = { legal: 'must accept the terms and conditions' };

    it('should update the errors', () => {
      const action = requestFailure(updatedErrors);
      const expected = Object.assign(
        {},
        initialState,
        { errors: updatedErrors },
      );

      expect(reducer(initialState, action)).toEqual(expected);
    });
  });

  describe('when UPDATE_FORM_DATA is dispatched', () => {
    it('should update the data', () => {
      const action = updateFormData({ data });
      const merged = Object.assign({}, initialState.data, data);
      const expected = Object.assign(
        {},
        initialState,
        { data: merged },
      );

      expect(reducer(initialState, action)).toEqual(expected);
    });

    describe('with path: many levels', () => {
      const path = ['tradeGoods', 0, 'technical', 0];

      it('should update the data', () => {
        const action = updateFormData({ data, path });
        const merged = assign(initialState.data, data, ...path);
        const expected = Object.assign(
          {},
          initialState,
          { data: merged },
        );

        expect(reducer(initialState, action)).toEqual(expected);
      });
    });
  });
};
