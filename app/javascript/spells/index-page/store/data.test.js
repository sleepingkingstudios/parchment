import {
  hooks,
  reducer,
} from './data';
import { actions } from './find';

describe('Spells index data', () => {
  describe('hooks', () => {
    const { useData } = hooks;

    describe('useData', () => {
      it('should be a function', () => {
        expect(typeof useData).toEqual('function');
      });
    });
  });

  describe('reducer', () => {
    const initialState = { spells: [] };
    const { REQUEST_SUCCESS } = actions;

    it('should be a function', () => {
      expect(typeof reducer).toEqual('function');
    });

    describe('initial state', () => {
      it('should set the initial state', () => {
        const action = { type: 'test/unknownAction' };

        expect(reducer(undefined, action)).toEqual({ data: initialState });
      });
    });

    describe('when REQUEST_SUCCESS is dispatched', () => {
      const data = { spells: [{ name: 'Flumph Lantern' }] };

      it('should set the data', () => {
        const state = { ...initialState };
        const action = { type: REQUEST_SUCCESS, payload: { data } };
        const expected = Object.assign({}, state, { data });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });
});
