import updateFindEndpoint from './index';
import { INITIALIZED } from '../../status';
import {
  shouldGenerateTheEndpointActions,
  shouldGenerateTheSelector,
} from '../../endpoint/testHelpers';
import {
  shouldInjectTheMiddleware,
} from '../../middleware/testHelpers';

describe('updateFindEndpoint', () => {
  const formEndpoint = {
    actions: { setFormData: () => {} },
    namespace: 'widgets/updateWidgetForm',
  };
  const resourceName = 'widget';
  const defaultOptions = { formEndpoint, resourceName };

  it('should be a function', () => {
    expect(typeof updateFindEndpoint).toEqual('function');
  });

  describe('with default options', () => {
    const namespace = 'widgets/updateFindWidget';
    const endpoint = updateFindEndpoint({ ...defaultOptions });

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
        expect(endpoint.middleware.length).toEqual(4);
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

      it('should set the redirect middleware', () => {
        const alerts = endpoint.middleware[2];
        const { options, type } = alerts;

        expect(type).toEqual('api/redirectToIndex');

        expect(options).toEqual({
          baseUrl: '/widgets',
          resourceName,
          on: 'failure',
        });
      });

      it('should set the updateFormData middleware', () => {
        const updateFormData = endpoint.middleware[3];
        const { options, type } = updateFormData;

        expect(type).toEqual('api/updateFormData');

        expect(options).toEqual({
          namespace: formEndpoint.namespace,
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
          expect(request.url).toEqual('/api/widgets/:id');
        });
      });
    });

    describe('selector', () => {
      const { selector } = endpoint;

      shouldGenerateTheSelector({ namespace, selector });
    });

    describe('type', () => {
      it('should be api/delete', () => {
        expect(endpoint.type).toEqual('api/resources/updateFind');
      });
    });
  });

  describe('with data: value', () => {
    const data = { widget: { name: '' } };
    const endpoint = updateFindEndpoint({ ...defaultOptions, data });

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

  describe('with mapData: function', () => {
    const mapData = data => ({ gadget: data.widget });
    const endpoint = updateFindEndpoint({ ...defaultOptions, mapData });

    describe('middleware', () => {
      it('should set the updateFormData middleware', () => {
        const updateFormData = endpoint.middleware[3];
        const { options, type } = updateFormData;

        expect(type).toEqual('api/updateFormData');

        expect(options).toEqual({
          mapData,
          namespace: formEndpoint.namespace,
        });
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions, mapData });
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
    const endpoint = updateFindEndpoint({ ...defaultOptions, middleware: directives });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions, middleware: directives });
      });
    });

    shouldInjectTheMiddleware({
      directives,
      middleware: endpoint.middleware,
      original: updateFindEndpoint({ ...defaultOptions }).middleware,
    });
  });

  describe('with namespace: value', () => {
    const namespace = 'path/to/widgets/updateFindWidget';
    const endpoint = updateFindEndpoint({ ...defaultOptions, namespace });

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
          expect(request.url).toEqual('/api/path/to/widgets/:id');
        });
      });
    });

    describe('selector', () => {
      const { selector } = endpoint;

      shouldGenerateTheSelector({ namespace, selector });
    });
  });

  describe('with url: value', () => {
    const url = '/api/v0/widgets/:id';
    const endpoint = updateFindEndpoint({ ...defaultOptions, url });

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
