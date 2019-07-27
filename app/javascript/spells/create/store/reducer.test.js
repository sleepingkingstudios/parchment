import reducer from './reducer';
import initialState from './initialState';
import {
  requestFailure,
  requestPending,
  requestSuccess,
  updateFormField,
} from './actions';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../../store/requestStatus';
import { spellDefaultAttributes } from '../../entities';

describe('Create Spell reducer', () => {
  const initialData = { name: 'Westley' };
  const initialErrors = { name: ["can't be blank"] };

  describe('when REQUEST_FAILURE is dispatched', () => {
    const errors = {
      name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
    };

    it('should mark the request as failing and set the errors', () => {
      const state = { ...initialState };
      const action = requestFailure(errors);
      const expected = Object.assign({}, state, {
        errors,
        requestStatus: FAILURE,
      });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has errors', () => {
      it('should mark the request as failed and set the errors', () => {
        const state = { ...initialState, errors: initialErrors };
        const action = requestFailure(errors);
        const expected = Object.assign({}, state, {
          errors,
          requestStatus: FAILURE,
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
        requestStatus: PENDING,
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
        data: spellDefaultAttributes,
        errors: {},
        requestStatus: SUCCESS,
      });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has data', () => {
      it('should mark the request as passing and clear the data and errors', () => {
        const state = { ...initialState, data: initialData };
        const action = requestSuccess(data);
        const expected = Object.assign({}, state, {
          data: spellDefaultAttributes,
          errors: {},
          requestStatus: SUCCESS,
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });

    describe('when the state has errors', () => {
      it('should mark the request as passing and clear the data and errors', () => {
        const state = { ...initialState, errors: initialErrors };
        const action = requestSuccess(data);
        const expected = Object.assign({}, state, {
          data: spellDefaultAttributes,
          errors: {},
          requestStatus: SUCCESS,
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
  });
});
