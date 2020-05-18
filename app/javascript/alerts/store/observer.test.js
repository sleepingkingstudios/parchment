import pathnameObserver from './observer';
import { dismissAllAlerts } from './actions';

describe('Alerts store observer', () => {
  let subscription;

  const dispatch = jest.fn();
  const unsubscribe = jest.fn();
  const subscribe = jest.fn(
    (handleChange) => {
      subscription = handleChange;

      return unsubscribe;
    },
  );
  const buildStore = state => (
    {
      dispatch,
      getState: jest.fn(() => state),
      subscribe,
    }
  );

  beforeEach(() => { dispatch.mockImplementationOnce(); });

  afterEach(() => { subscription = null; });

  it('should be a function', () => {
    expect(typeof pathnameObserver).toEqual('function');
  });

  it('should return the unsubscribe function', () => {
    const store = buildStore({});

    expect(pathnameObserver({ store })).toBe(unsubscribe);
  });

  it('should subscribe the handleChange function', () => {
    const store = buildStore({});

    pathnameObserver({ store });

    expect(typeof subscription).toEqual('function');
  });

  describe('when the store does not have a router', () => {
    it('should not dispatch an action', () => {
      const store = buildStore({});

      pathnameObserver({ store });

      subscription();

      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when the store has a router', () => {
    const location = { pathname: '/path/to/page' };
    const state = { router: { location } };

    it('should dispatch a dismissAllAlerts action', () => {
      const store = buildStore(state);

      pathnameObserver({ store });

      subscription();

      expect(dispatch).toHaveBeenCalledWith(dismissAllAlerts());
    });
  });

  describe('when the store has a previous router', () => {
    const previousLocation = { pathname: '/previous/path' };

    describe('when the store does not have a router', () => {
      it('should dispatch a dismissAllAlerts action', () => {
        const store = buildStore({});

        store.getState.mockImplementationOnce(() => ({
          router: { location: previousLocation },
        }));

        pathnameObserver({ store });

        subscription();

        dispatch.mockClear();

        subscription();

        expect(dispatch).toHaveBeenCalledWith(dismissAllAlerts());
      });
    });

    describe('when the location has not changed', () => {
      it('should not dispatch an action', () => {
        const store = buildStore({ router: { location: previousLocation } });

        store.getState.mockImplementationOnce(() => ({
          router: { location: previousLocation },
        }));

        pathnameObserver({ store });

        subscription();

        dispatch.mockClear();

        subscription();

        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('when the location has changed', () => {
      const location = { pathname: '/path/to/page' };
      const state = { router: { location } };

      it('should dispatch a dismissAllAlerts action', () => {
        const store = buildStore(state);

        store.getState.mockImplementationOnce(() => ({
          router: { location: previousLocation },
        }));

        pathnameObserver({ store });

        subscription();

        dispatch.mockClear();

        subscription();

        expect(dispatch).toHaveBeenCalledWith(dismissAllAlerts());
      });
    });
  });
});
