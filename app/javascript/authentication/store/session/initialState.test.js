import initialState from './initialState';
import { buildUser } from '../../entities';

describe('Session store initialState', () => {
  it('should be the initial state', () => {
    const user = buildUser();

    expect(initialState).toEqual({ token: '', user });
  });
});
