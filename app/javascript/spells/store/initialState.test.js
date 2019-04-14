import initialState from './initialState';
import { INITIALIZED } from '../../store/request_status';

describe('Spells store initialState', () => {
  it('should set the spells to an empty array', () => {
    expect(initialState.spells).toEqual([]);
  });

  it('should set the spells request status to "initialized"', () => {
    expect(initialState.spellsRequestStatus).toEqual(INITIALIZED);
  });
});
