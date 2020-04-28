import selector from './selector';

describe('Session store selector', () => {
  const session = { token: 'a.b.c' };
  const state = { authentication: { session } };

  it('should retrieve the data', () => {
    expect(selector(state)).toEqual(session);
  });
});
