import getInitialState from './initialState';
import { buildUser } from '../../entities';
import { encode } from '../encoder';

describe('Session store initialState', () => {
  const sessionKey = 'authentication/session';

  it('should be a function', () => {
    expect(typeof getInitialState).toEqual('function');
  });

  describe('when localStorage does not have an encoded session', () => {
    it('should return an empty session', () => {
      const localStorage = { getItem: jest.fn(() => undefined) };
      const initialState = getInitialState({ localStorage });
      const expected = {
        token: '',
        user: buildUser(),
      };

      expect(initialState).toEqual(expected);
    });

    it('should check localStorage for an encoded session', () => {
      const localStorage = { getItem: jest.fn(() => undefined) };

      getInitialState({ localStorage });

      expect(localStorage.getItem).toHaveBeenCalledWith(sessionKey);
    });
  });

  describe('when localStorage has an encoded session', () => {
    const session = {
      token: 'a.b.c',
      user: {
        id: '00000000-0000-0000-0000-000000000000',
        emailAddress: 'alan.bradley@example.com',
        role: 'user',
        username: 'Alan Bradley',
      },
    };
    const encoded = encode(session);

    it('should return the encoded session', () => {
      const localStorage = { getItem: jest.fn(() => encoded) };
      const initialState = getInitialState({ localStorage });

      expect(initialState).toEqual(session);
    });

    it('should check localStorage for an encoded session', () => {
      const localStorage = { getItem: jest.fn(() => encoded) };

      getInitialState({ localStorage });

      expect(localStorage.getItem).toHaveBeenCalledWith(sessionKey);
    });
  });
});
