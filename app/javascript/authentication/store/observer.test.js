import tokenObserver from './observer';
import { encode } from './encoder';

describe('Authentication store observer', () => {
  let subscription;

  const unsubscribe = jest.fn();
  const subscribe = jest.fn(
    (handleChange) => {
      subscription = handleChange;

      return unsubscribe;
    },
  );
  const localStorage = { removeItem: jest.fn(), setItem: jest.fn() };
  const buildStore = state => ({ getState: jest.fn(() => state), subscribe });
  const sessionKey = 'authentication/session';

  afterEach(() => {
    subscription = null;

    localStorage.removeItem.mockClear();
    localStorage.setItem.mockClear();
  });

  it('should be a function', () => {
    expect(typeof tokenObserver).toEqual('function');
  });

  it('should return the unsubscribe function', () => {
    const store = buildStore({});

    expect(tokenObserver({ localStorage, store })).toBe(unsubscribe);
  });

  it('should subscribe the handleChange function', () => {
    const store = buildStore({});

    tokenObserver({ localStorage, store });

    expect(typeof subscription).toEqual('function');
  });

  describe('when the store does not have a session', () => {
    it('should not update localStorage', () => {
      const store = buildStore({});

      tokenObserver({ localStorage, store });

      subscription();

      expect(localStorage.removeItem).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('when the store has a session', () => {
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
    const state = { authentication: { session } };

    it('should persist the session to localStorage', () => {
      const store = buildStore(state);

      tokenObserver({ localStorage, store });

      subscription();

      expect(localStorage.removeItem).not.toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(sessionKey, encoded);
    });
  });

  describe('when the store has a previous session', () => {
    const previousSession = {
      token: 'd.e.f',
      user: {
        id: '00000000-0000-0000-0000-000000000001',
        emailAddress: 'kevin.flynn@example.com',
        role: 'user',
        username: 'Kevin Flynn',
      },
    };

    describe('when the store does not have a session', () => {
      it('should clear localStorage', () => {
        const store = buildStore({});

        store.getState.mockImplementationOnce(() => ({
          authentication: { session: previousSession },
        }));

        tokenObserver({ localStorage, store });

        subscription();

        localStorage.setItem.mockClear();

        subscription();

        expect(localStorage.removeItem).toHaveBeenCalledWith(sessionKey);
        expect(localStorage.setItem).not.toHaveBeenCalled();
      });
    });

    describe('when the store has a session', () => {
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
      const state = { authentication: { session } };

      it('should persist the session to localStorage', () => {
        const store = buildStore(state);

        store.getState.mockImplementationOnce(() => ({
          authentication: { session: previousSession },
        }));

        tokenObserver({ localStorage, store });

        subscription();

        localStorage.setItem.mockClear();

        subscription();

        expect(localStorage.removeItem).not.toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalledWith(sessionKey, encoded);
      });
    });
  });
});
