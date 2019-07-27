import initialState from './initialState';
import { INITIALIZED } from '../../store/requestStatus';

describe('Spells store initialState', () => {
  it('should set the find spell request status to "initialized"', () => {
    expect(initialState.findSpellRequestStatus).toEqual(INITIALIZED);
  });

  it('should set the spell to an empty object', () => {
    expect(initialState.spell).toEqual({});
  });

  it('should set the spells to an empty array', () => {
    expect(initialState.spells).toEqual([]);
  });

  it('should set the spells request status to "initialized"', () => {
    expect(initialState.spellsRequestStatus).toEqual(INITIALIZED);
  });
});
