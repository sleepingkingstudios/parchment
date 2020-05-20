import createFormEndpoint from './index';
import { INITIALIZED } from '../../status';
import {
  shouldGenerateTheEndpointActions,
  shouldGenerateTheSelector,
} from '../../endpoint/testHelpers';

const shouldGenerateTheCreateFormActions = ({ actions, namespace }) => {
  const {
    SET_FORM_DATA,
    UPDATE_FORM_DATA,
    UPDATE_FORM_FIELD,
    setFormData,
    updateFormData,
    updateFormField,
  } = actions;

  describe('SET_FORM_DATA', () => {
    it('should define the action', () => {
      expect(SET_FORM_DATA).toEqual(`${namespace}/setFormData`);
    });
  });

  describe('UPDATE_FORM_DATA', () => {
    it('should define the action', () => {
      expect(UPDATE_FORM_DATA).toEqual(`${namespace}/updateFormData`);
    });
  });

  describe('UPDATE_FORM_FIELD', () => {
    it('should define the action', () => {
      expect(UPDATE_FORM_FIELD).toEqual(`${namespace}/updateFormField`);
    });
  });

  describe('setFormData', () => {
    it('should be a function', () => {
      expect(typeof setFormData).toEqual('function');
    });

    it('should create the action', () => {
      const data = {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Inigo Montoya',
      };
      const action = setFormData(data);

      expect(action).toEqual({
        type: SET_FORM_DATA,
        payload: { data },
      });
    });
  });

  describe('updateFormData', () => {
    it('should be a function', () => {
      expect(typeof updateFormData).toEqual('function');
    });

    it('should create the action', () => {
      const data = {
        name: 'Roberts',
        occupation: 'Dread Pirate',
      };
      const action = updateFormData({ data });

      expect(action).toEqual({
        type: UPDATE_FORM_DATA,
        payload: {
          path: [],
          data,
        },
      });
    });

    describe('with path: array', () => {
      it('should create the action', () => {
        const path = ['films', 'romance', 'characters'];
        const data = {
          name: 'Roberts',
          occupation: 'Dread Pirate',
        };
        const action = updateFormData({ data, path });

        expect(action).toEqual({
          type: UPDATE_FORM_DATA,
          payload: {
            path,
            data,
          },
        });
      });
    });

    describe('with path: value', () => {
      it('should create the action', () => {
        const path = 'characters';
        const data = {
          name: 'Roberts',
          occupation: 'Dread Pirate',
        };
        const action = updateFormData({ data, path });

        expect(action).toEqual({
          type: UPDATE_FORM_DATA,
          payload: {
            path: [path],
            data,
          },
        });
      });
    });
  });

  describe('updateFormField', () => {
    it('should be a function', () => {
      expect(typeof updateFormField).toEqual('function');
    });

    it('should create the action', () => {
      const propName = 'name';
      const value = 'Inigo Montoya';
      const action = updateFormField({ propName, value });

      expect(action).toEqual({
        type: UPDATE_FORM_FIELD,
        payload: {
          path: [],
          propName,
          value,
        },
      });
    });

    describe('with path: array', () => {
      it('should create the action', () => {
        const path = ['films', 'romance', 'characters'];
        const propName = 'name';
        const value = 'Inigo Montoya';
        const action = updateFormField({ path, propName, value });

        expect(action).toEqual({
          type: UPDATE_FORM_FIELD,
          payload: {
            path,
            propName,
            value,
          },
        });
      });
    });

    describe('with path: value', () => {
      it('should create the action', () => {
        const path = 'characters';
        const propName = 'name';
        const value = 'Inigo Montoya';
        const action = updateFormField({ path, propName, value });

        expect(action).toEqual({
          type: UPDATE_FORM_FIELD,
          payload: {
            path: [path],
            propName,
            value,
          },
        });
      });
    });
  });
};

describe('createFormEndpoint', () => {
  const resourceName = 'widget';
  const defaultOptions = { resourceName };

  it('should be a function', () => {
    expect(typeof createFormEndpoint).toEqual('function');
  });

  describe('with default options', () => {
    const namespace = 'widgets/createWidgetForm';
    const endpoint = createFormEndpoint({ ...defaultOptions });

    describe('actions', () => {
      const { actions } = endpoint;

      shouldGenerateTheEndpointActions({ actions, namespace });

      shouldGenerateTheCreateFormActions({ actions, namespace });
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
          action: 'create',
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
        it('should be POST', () => {
          expect(request.method).toEqual('POST');
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
      it('should be api/createForm', () => {
        expect(endpoint.type).toEqual('api/resources/createForm');
      });
    });
  });

  describe('with data: value', () => {
    const data = { widget: { name: '' } };
    const endpoint = createFormEndpoint({ ...defaultOptions, data });

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

  describe('with namespace: value', () => {
    const namespace = 'path/to/widgets/createWidgetForm';
    const endpoint = createFormEndpoint({ ...defaultOptions, namespace });

    describe('actions', () => {
      const { actions } = endpoint;

      shouldGenerateTheEndpointActions({ actions, namespace });

      shouldGenerateTheCreateFormActions({ actions, namespace });
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
        it('should be POST', () => {
          expect(request.method).toEqual('POST');
        });
      });

      describe('url', () => {
        it('should be /api/widgets', () => {
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
    const endpoint = createFormEndpoint({ ...defaultOptions, url });

    describe('options', () => {
      it('should return the options', () => {
        expect(endpoint.options).toEqual({ ...defaultOptions, url });
      });
    });

    describe('request', () => {
      const { request } = endpoint;

      describe('method', () => {
        it('should be POST', () => {
          expect(request.method).toEqual('POST');
        });
      });

      describe('url', () => {
        it('should be /api/widgets', () => {
          expect(request.url).toEqual(url);
        });
      });
    });
  });
});
