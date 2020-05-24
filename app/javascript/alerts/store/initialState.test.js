import initialState from './initialState';

describe('Alerts store initialState', () => {
  it('should set the alerts to an empty array', () => {
    expect(initialState.alerts).toEqual([]);
  });
});
