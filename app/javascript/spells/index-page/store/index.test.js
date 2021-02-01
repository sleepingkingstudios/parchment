import { exists } from 'utils/object';
import {
  hooks,
  reducer,
} from './index';

describe('Spells index store', () => {
  describe('hooks', () => {
    const {
      useData,
      useDataStatus,
      useDestroyRequest,
      useRequestData,
    } = hooks;

    describe('useData', () => {
      it('should be a function', () => {
        expect(typeof useData).toEqual('function');
      });
    });

    describe('useDataStatus', () => {
      it('should be a function', () => {
        expect(typeof useDataStatus).toEqual('function');
      });
    });

    describe('useDestroyRequest', () => {
      it('should be a function', () => {
        expect(typeof useDestroyRequest).toEqual('function');
      });
    });

    describe('useRequestData', () => {
      it('should be a function', () => {
        expect(typeof useRequestData).toEqual('function');
      });
    });
  });

  describe('reducer', () => {
    it('should be a function', () => {
      expect(typeof reducer).toEqual('function');
    });

    it('should combine the reducers', () => {
      const action = { type: 'test/unknownAction' };
      const initialState = reducer(undefined, action);

      expect(exists(initialState.data)).toBe(true);
      expect(exists(initialState.destroy)).toBe(true);
      expect(exists(initialState.find)).toBe(true);
    });
  });
});
