import { clearSession } from '../../../authentication/store/session/actions';
import authorization from './index';

describe('authorization request middleware', () => {
  const {
    buildRequest,
    handleFailure,
    type,
  } = authorization;

  describe('buildRequest()', () => {
    const method = 'GET';
    const namespace = 'api/endpoint';

    it('should be a function', () => {
      expect(typeof buildRequest).toEqual('function');
    });

    it('should return a function', () => {
      const next = jest.fn();

      expect(typeof buildRequest(next)).toEqual('function');
    });

    describe('when the session token is not set', () => {
      const getState = jest.fn();
      const rawRequest = { body: '', headers: { key: 'value' } };
      const next = jest.fn(() => rawRequest);

      it('should return the unmodified request', () => {
        const request = buildRequest(next)({ getState, method, namespace });

        expect(request).toEqual(rawRequest);
      });

      it('should call the next function', () => {
        buildRequest(next)({ getState, method, namespace });

        expect(next).toHaveBeenCalledWith({ getState, method, namespace });
      });
    });

    describe('when the session token is set', () => {
      const token = 'a.b.c';
      const state = { authentication: { session: { token } } };
      const getState = jest.fn(() => state);
      const rawRequest = { body: '', headers: { key: 'value' } };
      const next = jest.fn(() => rawRequest);

      it('should add the authorization header to the request', () => {
        const expected = Object.assign(
          {},
          rawRequest,
          {
            headers: Object.assign(
              {},
              rawRequest.headers,
              { Authorization: `BEARER ${token}` },
            ),
          },
        );
        const request = buildRequest(next)({ getState, method, namespace });

        expect(request).toEqual(expected);
      });

      it('should call the next function', () => {
        buildRequest(next)({ getState, method, namespace });

        expect(next).toHaveBeenCalledWith({ getState, method, namespace });
      });
    });
  });

  describe('handleFailure()', () => {
    it('should be a function', () => {
      expect(typeof handleFailure).toEqual('function');
    });

    it('should return a function', () => {
      const next = jest.fn();

      expect(typeof handleFailure(next)).toEqual('function');
    });

    describe('when the failure status is not 401 or 403', () => {
      const getState = jest.fn();
      const response = { status: 422 };
      const next = jest.fn();

      it('should not dispatch an action', () => {
        const dispatch = jest.fn();

        handleFailure(next)({ dispatch, getState, response });

        expect(dispatch).not.toHaveBeenCalled();
      });

      it('should call the next function', () => {
        const dispatch = jest.fn();

        handleFailure(next)({ dispatch, getState, response });

        expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
      });
    });

    describe('when the failure status is 401', () => {
      const getState = jest.fn();
      const response = { status: 401 };
      const next = jest.fn();

      it('should dispatch a clearSession action', () => {
        const dispatch = jest.fn();
        const expected = clearSession();

        handleFailure(next)({ dispatch, getState, response });

        expect(dispatch).toHaveBeenCalledWith(expected);
      });

      it('should call the next function', () => {
        const dispatch = jest.fn();

        handleFailure(next)({ dispatch, getState, response });

        expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
      });
    });

    describe('when the failure status is 403', () => {
      const getState = jest.fn();
      const response = { status: 403 };
      const next = jest.fn();

      it('should dispatch a clearSession action', () => {
        const dispatch = jest.fn();
        const expected = clearSession();

        handleFailure(next)({ dispatch, getState, response });

        expect(dispatch).toHaveBeenCalledWith(expected);
      });

      it('should call the next function', () => {
        const dispatch = jest.fn();

        handleFailure(next)({ dispatch, getState, response });

        expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
      });
    });
  });

  describe('type', () => {
    it('should return "api/authorization"', () => {
      expect(type).toEqual('api/authorization');
    });
  });
});
