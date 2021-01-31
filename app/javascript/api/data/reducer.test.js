import generateReducer from './reducer';

describe('API data reducer', () => {
  const REQUEST_SUCCESS = 'test/requestSuccess';
  const initialState = { widgets: [] };
  const actions = { REQUEST_SUCCESS };
  const reducer = generateReducer({ actions, initialState });

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
    const data = [{ name: 'Inigo Montoya' }];

    it('should set the data', () => {
      const state = { ...initialState };
      const action = { type: REQUEST_SUCCESS, payload: { data } };
      const expected = Object.assign({}, state, { data });

      expect(reducer(state, action)).toEqual(expected);
    });

    describe('when the state has data', () => {
      const previousData = [
        {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'Westley',
        },
      ];

      it('should set the data', () => {
        const state = { ...initialState, data: previousData };
        const action = { type: REQUEST_SUCCESS, payload: { data } };
        const expected = Object.assign({}, state, { data });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });
});
