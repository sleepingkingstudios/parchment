import initialState from './initialState';
import { INITIALIZED } from '../../../store/requestStatus';

describe('Create Spell store initialState', () => {
  it('should set the errors to an empty object', () => {
    expect(initialState.errors).toEqual({});
  });

  it('should set the request status to "initialized"', () => {
    expect(initialState.requestStatus).toEqual(INITIALIZED);
  });
});
