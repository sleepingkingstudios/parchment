import generateActions from './actions';
import generateInitialState from './initialState';
import generateReducer from './reducer';
import {
  shouldGenerateTheReducer,
} from './testHelpers';

describe('API client reducer', () => {
  const namespace = 'findWidgets';
  const actions = generateActions({ namespace });
  const initialState = generateInitialState({ data: {}, namespace });
  const reducer = generateReducer({ actions, initialState });

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

  shouldGenerateTheReducer({
    actions,
    initialState,
    reducer,
  });
});
