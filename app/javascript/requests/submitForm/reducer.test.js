import generateActions from './actions';
import generateInitialState from './initialState';
import generateReducer from './reducer';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/requestStatus';

describe('Form request reducer', () => {
  const namespace = 'createWidget';
  const actions = generateActions({ namespace });
  const initialState = generateInitialState({ data: {}, namespace });
  const reducer = generateReducer({ actions, initialState });
  const {
    requestFailure,
    requestPending,
    requestSuccess,
    updateFormField,
  } = actions;
  const previousData = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Westley',
  };
  const previousErrors = { name: ["can't be blank"] };

  describe('generateReducer', () => {
    it('should be a function', () => {
      expect(typeof generateReducer).toEqual('function');
    });
  });

  describe('reducer', () => {
    it('should be a function', () => {
      expect(typeof reducer).toEqual('function');
    });
  });

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
    const data = { name: 'Inigo Montoya' };

    it('should mark the request as passing and clear the data and errors', () => {
      const state = { ...initialState };
      const action = requestSuccess(data);
      const expected = Object.assign({}, state, {
        data: initialState.data,
        errors: {},
        status: SUCCESS,
      });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has data', () => {
      it('should mark the request as passing and clear the data and errors', () => {
        const state = { ...initialState, data: previousData };
        const action = requestSuccess(data);
        const expected = Object.assign({}, state, {
          data: initialState.data,
          errors: {},
          status: SUCCESS,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });

    describe('when the state has errors', () => {
      it('should mark the request as passing and clear the data and errors', () => {
        const state = { ...initialState, errors: previousErrors };
        const action = requestSuccess(data);
        const expected = Object.assign({}, state, {
          data: initialState.data,
          errors: {},
          status: SUCCESS,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when UPDATE_FORM_FIELD is dispatched', () => {
    const propName = 'name';
    const value = 'Inigo Montoya';

    it('should update the data', () => {
      const action = updateFormField({ propName, value });
      const data = Object.assign({}, initialState.data, { name: value });
      const expected = Object.assign(
        {},
        initialState,
        { data },
      );

      expect(reducer(initialState, action)).toEqual(expected);
    });

    describe('when the state has data', () => {
      it('should update the data', () => {
        const state = { ...initialState, data: previousData };
        const action = updateFormField({ propName, value });
        const data = Object.assign({}, state.data, { name: value });
        const expected = Object.assign(
          {},
          state,
          { data },
        );

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });
});
