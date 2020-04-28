import initialState from './initialState';

describe('Session store initialState', () => {
  it('should be the initial state', () => {
    expect(initialState).toEqual({ token: '' });
  });
});
