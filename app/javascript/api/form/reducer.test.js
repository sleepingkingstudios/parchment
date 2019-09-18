import generateActions from './actions';
import generateInitialState from '../endpoint/initialState';
import generateReducer from './reducer';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../status';
import {
  assign,
  dig,
} from '../../utils/object';

describe('Form request reducer', () => {
  const namespace = 'createWidget';
  const actions = generateActions({ namespace });
  const initialState = generateInitialState({ data: {}, namespace });
  const reducer = generateReducer({ actions, initialState });
  const {
    requestFailure,
    requestPending,
    requestSuccess,
    setFormData,
    updateFormData,
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

  describe('when SET_FORM_DATA is dispatched', () => {
    const data = { name: 'Inigo Montoya' };

    it('should set the data', () => {
      const state = { ...initialState };
      const action = setFormData(data);
      const expected = Object.assign({}, state, { data });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has data', () => {
      it('should mark the request as passing and clear the data and errors', () => {
        const state = { ...initialState, data: previousData };
        const action = setFormData(data);
        const expected = Object.assign({}, state, { data });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when UPDATE_FORM_DATA is dispatched', () => {
    const data = {
      name: 'Roberts',
      occupation: 'Dread Pirate',
    };

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

    describe('when the state has data', () => {
      it('should update the data', () => {
        const state = { ...initialState, data: previousData };
        const action = updateFormData({ data });
        const merged = Object.assign({}, state.data, data);
        const expected = Object.assign(
          {},
          state,
          { data: merged },
        );

        expect(reducer(state, action)).toEqual(expected);
      });
    });

    describe('with path: many levels', () => {
      const path = ['films', 0, 'characters', 0];

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

      describe('when the state has data', () => {
        const previousNestedData = {
          books: [
            {
              author: 'J.R.R. Tolkien',
              title: 'The Fellowship of the Ring',
            },
          ],
          films: [
            {
              title: 'The Princess Bride',
              characters: [
                {
                  id: '00000000-0000-0000-0000-000000000000',
                  name: 'Westley',
                },
                {
                  id: '00000000-0000-0000-0000-000000000001',
                  name: 'Buttercup',
                },
              ],
            },
            {
              title: 'TRON',
            },
          ],
        };

        it('should update the data', () => {
          const state = { ...initialState, data: previousNestedData };
          const merged = Object.assign({}, dig(state.data, ...path), data);
          const nested = assign(state.data, merged, ...path);
          const action = updateFormData({ data, path });
          const expected = Object.assign(
            {},
            state,
            { data: nested },
          );

          expect(reducer(state, action)).toEqual(expected);
        });
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

    describe('with path: many levels', () => {
      const path = ['films', 0, 'characters', 0];

      it('should update the data', () => {
        const action = updateFormField({ path, propName, value });
        const data = assign(initialState.data, value, ...path, propName);
        const expected = Object.assign(
          {},
          initialState,
          { data },
        );

        expect(reducer(initialState, action)).toEqual(expected);
      });

      describe('when the state has data', () => {
        const previousNestedData = {
          books: [
            {
              author: 'J.R.R. Tolkien',
              title: 'The Fellowship of the Ring',
            },
          ],
          films: [
            {
              title: 'The Princess Bride',
              characters: [
                {
                  id: '00000000-0000-0000-0000-000000000000',
                  name: 'Westley',
                },
                {
                  id: '00000000-0000-0000-0000-000000000001',
                  name: 'Buttercup',
                },
              ],
            },
            {
              title: 'TRON',
            },
          ],
        };

        it('should update the data', () => {
          const state = { ...initialState, data: previousNestedData };
          const action = updateFormField({ path, propName, value });
          const data = assign(state.data, value, ...path, propName);
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
});
