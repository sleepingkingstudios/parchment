import { shouldGenerateTheActions } from 'api/client/testHelpers';
import { INITIALIZED } from 'api/status';
import buildClient from './find';

jest.mock('cross-fetch');

describe('resource show page find buildClient()', () => {
  const baseUrl = '/path/to/widgets';
  const namespace = 'path/to/widgets/find';
  const resourceName = 'widgets';
  const url = 'api/v1/widgets';
  const defaultOptions = {
    baseUrl,
    namespace,
    resourceName,
    url,
  };

  describe('with default options', () => {
    const client = buildClient({ ...defaultOptions });

    describe('actions', () => {
      const { actions } = client;

      shouldGenerateTheActions({
        actions,
        namespace,
      });
    });

    describe('hooks', () => {
      const { hooks } = client;

      describe('usePerformRequest()', () => {
        const { usePerformRequest } = hooks;

        it('should be a function', () => {
          expect(typeof usePerformRequest === 'function').toBe(true);
        });
      });

      describe('useRequest()', () => {
        const { useRequest } = hooks;

        it('should be a function', () => {
          expect(typeof useRequest === 'function').toBe(true);
        });
      });

      describe('useStatus()', () => {
        const { useStatus } = hooks;

        it('should be a function', () => {
          expect(typeof useStatus === 'function').toBe(true);
        });
      });
    });

    describe('method', () => {
      it('should return the method', () => {
        expect(client.method).toEqual('GET');
      });
    });

    describe('middleware', () => {
      const { middleware } = client;

      it('should have 3 items', () => {
        expect(middleware.length).toEqual(3);
      });

      describe('alerts', () => {
        const alerts = middleware[1];

        it('should have type api/alerts', () => {
          expect(alerts.type).toEqual('api/alerts');
        });

        it('should be configured with options', () => {
          const { options } = alerts;
          const expected = {
            action: 'find',
            failure: true,
            resourceName,
          };

          expect(options).toEqual(expected);
        });
      });

      describe('authorization', () => {
        const authorization = middleware[0];

        it('should have type api/authorization', () => {
          expect(authorization.type).toEqual('api/authorization');
        });
      });

      describe('redirect', () => {
        const redirect = middleware[2];

        it('should have type api/redirectToIndex', () => {
          expect(redirect.type).toEqual('api/redirectToIndex');
        });

        it('should be configured with options', () => {
          const { options } = redirect;
          const expected = {
            baseUrl,
            resourceName,
            on: 'failure',
          };

          expect(options).toEqual(expected);
        });
      });
    });

    describe('namespace', () => {
      it('should be the configured namespace', () => {
        expect(client.namespace).toEqual(namespace);
      });
    });

    describe('options', () => {
      const { options } = client;

      it('should return the configured options', () => {
        expect(options).toEqual(defaultOptions);
      });
    });

    describe('performRequest()', () => {
      const { performRequest } = client;

      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });
    });

    describe('reducer', () => {
      const { reducer } = client;
      const initialState = {
        data: {},
        errors: {},
        status: INITIALIZED,
      };

      it('should be a function', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should set the initial state', () => {
        const action = { type: 'test/action' };
        const state = reducer(undefined, action);

        expect(state).toEqual(initialState);
      });
    });

    describe('type', () => {
      it('should be resource/show-page/find', () => {
        expect(client.type).toEqual('resource/show-page/find');
      });
    });

    describe('url', () => {
      it('should return the configured url', () => {
        expect(client.url).toEqual(url);
      });
    });
  });

  describe('with middleware: array', () => {
    const customMiddleware = { onSuccess: jest.fn(), type: 'test/customMiddleware' };
    const client = buildClient({ ...defaultOptions, middleware: [customMiddleware] });

    describe('middleware', () => {
      const { middleware } = client;

      it('should have 4 items', () => {
        expect(middleware.length).toEqual(4);
      });

      describe('alerts', () => {
        const alerts = middleware[1];

        it('should have type api/alerts', () => {
          expect(alerts.type).toEqual('api/alerts');
        });

        it('should be configured with options', () => {
          const { options } = alerts;
          const expected = {
            action: 'find',
            failure: true,
            resourceName,
          };

          expect(options).toEqual(expected);
        });
      });

      describe('authorization', () => {
        const authorization = middleware[0];

        it('should have type api/authorization', () => {
          expect(authorization.type).toEqual('api/authorization');
        });
      });

      describe('customMiddleware', () => {
        it('should append the custom middleware', () => {
          expect(middleware[3]).toEqual(customMiddleware);
        });
      });

      describe('redirect', () => {
        const redirect = middleware[2];

        it('should have type api/redirectToIndex', () => {
          expect(redirect.type).toEqual('api/redirectToIndex');
        });

        it('should be configured with options', () => {
          const { options } = redirect;
          const expected = {
            baseUrl,
            resourceName,
            on: 'failure',
          };

          expect(options).toEqual(expected);
        });
      });
    });

    describe('options', () => {
      const { options } = client;

      it('should return the configured options', () => {
        expect(options).toEqual({ ...defaultOptions, middleware: [customMiddleware] });
      });
    });
  });
});
