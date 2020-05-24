import indexEndpoint from './index';
import { INITIALIZED } from '../../status';
import {
  shouldGenerateTheEndpointActions,
  shouldGenerateTheSelector,
} from '../../endpoint/testHelpers';
import {
  shouldInjectTheMiddleware,
} from '../../middleware/testHelpers';

describe('indexEndpoint', () => {
  const resourceName = 'widgets';
  const defaultOptions = { resourceName };

  it('should be a function', () => {
    expect(typeof indexEndpoint).toEqual('function');
  });

  describe('with default options', () => {
    const namespace = 'widgets/indexFindWidgets';
    const endpoint = indexEndpoint({ ...defaultOptions });

    describe('actions', () => {
      const { actions } = endpoint;

      shouldGenerateTheEndpointActions({ actions, namespace });
    });

    describe('hooks', () => {
      const { hooks } = endpoint;
      const {
        useEndpoint,
        useRequestData,
      } = hooks;

      describe('useEndpoint()', () => {
        it('should be a function', () => {
          expect(typeof useEndpoint).toEqual('function');
        });
      });

      describe('useRequestData()', () => {
        it('should be a function', () => {
          expect(typeof useRequestData).toEqual('function');
        });
      });
    });

    describe('middleware', () => {
      it('should set the middleware', () => {
        expect(endpoint.middleware.length).toEqual(2);
      });

      it('should set the authorization middleware', () => {
        const authorization = endpoint.middleware[0];
        const { type } = authorization;

        expect(type).toEqual('api/authorization');
      });

      it('should set the alerts middleware', () => {
        const alerts = endpoint.middleware[1];
        const { options, type } = alerts;

        expect(type).toEqual('api/alerts');

        expect(options).toEqual({
          action: 'find',
          resourceName,
          failure: true,
        });
      });
    });

    describe('namespace', () => {
      it('should set the namespace', () => {
        expect(endpoint.namespace).toEqual(namespace);
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions });
      });
    });

    describe('reducer', () => {
      const { reducer } = endpoint;

      it('should generate the reducer', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should set the initial state', () => {
        const state = reducer(undefined, { type: 'test/action' });
        const expected = {
          data: {},
          errors: {},
          status: INITIALIZED,
        };

        expect(state).toEqual(expected);
      });
    });

    describe('request', () => {
      const { request } = endpoint;

      describe('method', () => {
        it('should be GET', () => {
          expect(request.method).toEqual('GET');
        });
      });

      describe('url', () => {
        it('should be /api/widgets', () => {
          expect(request.url).toEqual('/api/widgets');
        });
      });
    });

    describe('selector', () => {
      const { selector } = endpoint;

      shouldGenerateTheSelector({ namespace, selector });
    });

    describe('type', () => {
      it('should be api/delete', () => {
        expect(endpoint.type).toEqual('api/resources/index');
      });
    });
  });

  describe('with data: value', () => {
    const data = { widgets: [] };
    const endpoint = indexEndpoint({ ...defaultOptions, data });

    describe('reducer', () => {
      const { reducer } = endpoint;

      it('should generate the reducer', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should set the initial state', () => {
        const state = reducer(undefined, { type: 'test/action' });
        const expected = {
          data,
          errors: {},
          status: INITIALIZED,
        };

        expect(state).toEqual(expected);
      });
    });
  });

  describe('with middleware: directives', () => {
    const directives = [
      {
        middleware: { type: 'test/first' },
        before: ':all',
      },
      {
        middleware: { type: 'test/afterAuthorization' },
        after: 'api/authorization',
      },
      {
        middleware: { type: 'test/last' },
        after: ':all',
      },
    ];
    const endpoint = indexEndpoint({ ...defaultOptions, middleware: directives });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions, middleware: directives });
      });
    });

    shouldInjectTheMiddleware({
      directives,
      middleware: endpoint.middleware,
      original: indexEndpoint({ ...defaultOptions }).middleware,
    });
  });

  describe('with namespace: value', () => {
    const namespace = 'path/to/widgets/indexFindWidgets';
    const endpoint = indexEndpoint({ ...defaultOptions, namespace });

    describe('actions', () => {
      const { actions } = endpoint;

      shouldGenerateTheEndpointActions({ actions, namespace });
    });

    describe('namespace', () => {
      it('should set the namespace', () => {
        expect(endpoint.namespace).toEqual(namespace);
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions, namespace });
      });
    });

    describe('request', () => {
      const { request } = endpoint;

      describe('method', () => {
        it('should be GET', () => {
          expect(request.method).toEqual('GET');
        });
      });

      describe('url', () => {
        it('should be /api/path/to/widgets', () => {
          expect(request.url).toEqual('/api/path/to/widgets');
        });
      });
    });

    describe('selector', () => {
      const { selector } = endpoint;

      shouldGenerateTheSelector({ namespace, selector });
    });
  });

  describe('with url: value', () => {
    const url = '/api/v0/widgets';
    const endpoint = indexEndpoint({ ...defaultOptions, url });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions, url });
      });
    });

    describe('request', () => {
      const { request } = endpoint;

      describe('method', () => {
        it('should be GET', () => {
          expect(request.method).toEqual('GET');
        });
      });

      describe('url', () => {
        it('should be the given url', () => {
          expect(request.url).toEqual(url);
        });
      });
    });
  });
});
