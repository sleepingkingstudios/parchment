/* eslint-env jest */

import {
  FAILURE,
  PENDING,
  SUCCESS,
} from 'api/status';

export const shouldGenerateTheActions = ({ actions, namespace }) => {
  const {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    requestFailure,
    requestPending,
    requestSuccess,
  } = actions;

  describe('REQUEST_FAILURE', () => {
    it('should define the action', () => {
      expect(REQUEST_FAILURE).toEqual(`${namespace}/requestFailure`);
    });
  });

  describe('REQUEST_PENDING', () => {
    it('should define the action', () => {
      expect(REQUEST_PENDING).toEqual(`${namespace}/requestPending`);
    });
  });

  describe('REQUEST_SUCCESS', () => {
    it('should define the action', () => {
      expect(REQUEST_SUCCESS).toEqual(`${namespace}/requestSuccess`);
    });
  });

  describe('requestFailure', () => {
    it('should be a function', () => {
      expect(typeof requestFailure).toEqual('function');
    });

    it('should create the action', () => {
      const errors = { widget: ['not_found'] };
      const action = requestFailure(errors);

      expect(action).toEqual({
        type: REQUEST_FAILURE,
        payload: { errors },
      });
    });
  });

  describe('requestPending', () => {
    it('should be a function', () => {
      expect(typeof requestPending).toEqual('function');
    });

    it('should create the action', () => {
      const action = requestPending();

      expect(action).toEqual({ type: REQUEST_PENDING, payload: {} });
    });
  });

  describe('requestSuccess', () => {
    it('should be a function', () => {
      expect(typeof requestSuccess).toEqual('function');
    });

    it('should create the action', () => {
      const data = {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Inigo Montoya',
      };
      const action = requestSuccess(data);

      expect(action).toEqual({
        type: REQUEST_SUCCESS,
        payload: { data },
      });
    });
  });
};

export const shouldGenerateTheReducer = ({ actions, initialState, reducer }) => {
  const {
    requestFailure,
    requestPending,
    requestSuccess,
  } = actions;
  const previousData = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Westley',
    },
  ];
  const previousErrors = { name: ["can't be blank"] };

  describe('initial state', () => {
    it('should set the initial state', () => {
      const action = { type: 'test/unknownAction' };

      expect(reducer(undefined, action)).toEqual(initialState);
    });
  });

  describe('when REQUEST_FAILURE is dispatched', () => {
    const errors = {
      name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
    };

    it('should mark the request as failing and set the errors', () => {
      const state = { ...initialState };
      const action = requestFailure(errors);
      const expected = Object.assign({}, state, {
        errors,
        status: FAILURE,
      });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has errors', () => {
      it('should mark the request as failed and set the errors', () => {
        const state = { ...initialState, errors: previousErrors };
        const action = requestFailure(errors);
        const expected = Object.assign({}, state, {
          errors,
          status: FAILURE,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when REQUEST_PENDING is dispatched', () => {
    it('should mark the request as pending', () => {
      const state = { ...initialState };
      const action = requestPending();
      const expected = Object.assign({}, state, {
        status: PENDING,
      });

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('when REQUEST_SUCCESS is dispatched', () => {
    const data = [{ name: 'Inigo Montoya' }];

    it('should mark the request as passing, set the data, and clear the errors', () => {
      const state = { ...initialState };
      const action = requestSuccess(data);
      const expected = Object.assign({}, state, {
        data,
        errors: {},
        status: SUCCESS,
      });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has data', () => {
      it('should mark the request as passing, set the data, and clear the errors', () => {
        const state = { ...initialState, data: previousData };
        const action = requestSuccess(data);
        const expected = Object.assign({}, state, {
          data,
          errors: {},
          status: SUCCESS,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });

    describe('when the state has errors', () => {
      it('should mark the request as passing, set the data, and clear the errors', () => {
        const state = { ...initialState, errors: previousErrors };
        const action = requestSuccess(data);
        const expected = Object.assign({}, state, {
          data,
          errors: {},
          status: SUCCESS,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });
};

export const shouldGenerateTheSelector = ({ namespace, selector }) => {
  const generateState = (data) => {
    const segments = namespace.split('/');

    return segments.reverse().reduce((memo, key) => {
      const obj = {};

      obj[key] = memo;

      return obj;
    }, data);
  };

  it('should be a function', () => {
    expect(typeof selector).toEqual('function');
  });

  it('should select the data', () => {
    const data = { value: 'value' };
    const state = generateState(data);

    expect(selector(state)).toEqual(data);
  });
};
