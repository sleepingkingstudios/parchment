import updateFormEndpoint from './index';
import { INITIALIZED } from '../../status';
import {
  shouldGenerateTheEndpointActions,
  shouldGenerateTheSelector,
} from '../../endpoint/testHelpers';
import {
  shouldGenerateTheFormActions,
} from '../../form/testHelpers';
import {
  shouldInjectTheMiddleware,
} from '../../middleware/testHelpers';

describe('updateFormEndpoint', () => {
  const resourceName = 'widget';
  const defaultOptions = { resourceName };

  it('should be a function', () => {
    expect(typeof updateFormEndpoint).toEqual('function');
  });

  describe('with default options', () => {
    const namespace = 'widgets/updateWidgetForm';
    const endpoint = updateFormEndpoint({ ...defaultOptions });

    describe('actions', () => {
      const { actions } = endpoint;

      shouldGenerateTheEndpointActions({ actions, namespace });

      shouldGenerateTheFormActions({ actions, namespace });
    });

    describe('hooks', () => {
      const { hooks } = endpoint;
      const {
        useEndpoint,
        useSubmitForm,
        useUpdateForm,
      } = hooks;

      describe('useEndpoint()', () => {
        it('should be a function', () => {
          expect(typeof useEndpoint).toEqual('function');
        });
      });

      describe('useSubmitForm()', () => {
        it('should be a function', () => {
          expect(typeof useSubmitForm).toEqual('function');
        });
      });

      describe('useUpdateForm()', () => {
        it('should be a function', () => {
          expect(typeof useUpdateForm).toEqual('function');
        });
      });
    });

    describe('middleware', () => {
      it('should set the middleware', () => {
        expect(endpoint.middleware.length).toEqual(3);
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
          action: 'update',
          resourceName,
          pending: true,
          failure: true,
          success: true,
        });
      });

      it('should set the redirect middleware', () => {
        const alerts = endpoint.middleware[2];
        const { options, type } = alerts;

        expect(type).toEqual('api/redirectToShow');

        expect(options).toEqual({
          baseUrl: '/widgets',
          resourceName,
          on: 'success',
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
        it('should be PATCH', () => {
          expect(request.method).toEqual('PATCH');
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
      it('should be api/createForm', () => {
        expect(endpoint.type).toEqual('api/resources/updateForm');
      });
    });
  });

  describe('with data: value', () => {
    const data = { widget: { name: '' } };
    const endpoint = updateFormEndpoint({ ...defaultOptions, data });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions, data });
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
    const endpoint = updateFormEndpoint({ ...defaultOptions, middleware: directives });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions, middleware: directives });
      });
    });

    shouldInjectTheMiddleware({
      directives,
      middleware: endpoint.middleware,
      original: updateFormEndpoint({ ...defaultOptions }).middleware,
    });
  });

  describe('with namespace: value', () => {
    const namespace = 'path/to/widgets/updateWidgetForm';
    const endpoint = updateFormEndpoint({ ...defaultOptions, namespace });

    describe('actions', () => {
      const { actions } = endpoint;

      shouldGenerateTheEndpointActions({ actions, namespace });

      shouldGenerateTheFormActions({ actions, namespace });
    });

    describe('middleware', () => {
      it('should set the redirect middleware', () => {
        const alerts = endpoint.middleware[2];
        const { options, type } = alerts;

        expect(type).toEqual('api/redirectToShow');

        expect(options).toEqual({
          baseUrl: '/path/to/widgets',
          resourceName,
          on: 'success',
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
        expect(endpoint.options).toEqual({ ...defaultOptions, namespace });
      });
    });

    describe('request', () => {
      const { request } = endpoint;

      describe('method', () => {
        it('should be PATCH', () => {
          expect(request.method).toEqual('PATCH');
        });
      });

      describe('url', () => {
        it('should be /api/path/to/widgets/:id', () => {
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
    const endpoint = updateFormEndpoint({ ...defaultOptions, url });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions, url });
      });
    });

    describe('request', () => {
      const { request } = endpoint;

      describe('method', () => {
        it('should be PATCH', () => {
          expect(request.method).toEqual('PATCH');
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
