import React from 'react';
import { Route, Switch } from 'react-router';

import buildResource from './index';
import normalizeResources from './normalize';
import {
  Block,
  Form,
  Table,
  LandingPage,
  fixtures,
} from './fixtures';
import {
  shouldGenerateTheReducer,
  shouldGenerateTheRoutes,
} from './testHelpers';

jest.mock('./normalize');

normalizeResources.mockImplementation(() => fixtures);

describe('resource buildResource()', () => {
  const resourceName = 'widgets';
  const url = '/api/v1/widgets';
  const defaultOptions = {
    Block,
    Form,
    Table,
    resourceName,
    url,
  };

  beforeEach(() => { normalizeResources.mockClear(); });

  it('should be a function', () => {
    expect(typeof buildResource).toEqual('function');
  });

  describe('with default options', () => {
    const resource = buildResource(defaultOptions);
    const normalized = fixtures;

    it('should normalize the resources', () => {
      const expected = {
        ...defaultOptions,
        baseUrl: '/widgets',
        namespace: 'widgets',
        singularResourceName: 'widget',
      };

      buildResource(defaultOptions);

      expect(normalizeResources).toHaveBeenCalledWith(expected);
    });

    describe('<Routes />', () => {
      const { Routes } = resource;

      shouldGenerateTheRoutes({
        Routes,
        normalized,
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(resource.options).toEqual(defaultOptions);
      });
    });

    describe('reducer', () => {
      const { reducer } = resource;

      shouldGenerateTheReducer({
        normalized,
        reducer,
      });
    });

    describe('type', () => {
      it('should be resource', () => {
        expect(resource.type).toEqual('resource');
      });
    });
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/path/to/widgets';
    const resource = buildResource({ ...defaultOptions, baseUrl });

    it('should normalize the resources', () => {
      const expected = {
        ...defaultOptions,
        baseUrl,
        namespace: 'widgets',
        singularResourceName: 'widget',
      };

      buildResource({ ...defaultOptions, baseUrl });

      expect(normalizeResources).toHaveBeenCalledWith(expected);
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(resource.options).toEqual({ ...defaultOptions, baseUrl });
      });
    });
  });

  describe('with namespace: value', () => {
    const namespace = 'tools/widgets';
    const resource = buildResource({ ...defaultOptions, namespace });

    it('should normalize the resources', () => {
      const expected = {
        ...defaultOptions,
        baseUrl: '/widgets',
        namespace,
        singularResourceName: 'widget',
      };

      buildResource({ ...defaultOptions, namespace });

      expect(normalizeResources).toHaveBeenCalledWith(expected);
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(resource.options).toEqual({ ...defaultOptions, namespace });
      });
    });
  });

  describe('with singularResourceName: value', () => {
    const singularResourceName = 'gadget';
    const resource = buildResource({ ...defaultOptions, singularResourceName });

    it('should normalize the resources', () => {
      const expected = {
        ...defaultOptions,
        baseUrl: '/widgets',
        namespace: 'widgets',
        singularResourceName,
      };

      buildResource({ ...defaultOptions, singularResourceName });

      expect(normalizeResources).toHaveBeenCalledWith(expected);
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(resource.options).toEqual({ ...defaultOptions, singularResourceName });
      });
    });
  });

  describe('with resources: boolean values', () => {
    const data = { factories: [], widgets: [] };
    const resources = {
      index: { options: { data } },
    };
    const normalized = {
      index: fixtures.index,
      show: fixtures.show,
    };

    normalizeResources.mockImplementationOnce(() => normalized);

    const resource = buildResource({ ...defaultOptions, resources });

    it('should normalize the resources', () => {
      const expected = {
        ...defaultOptions,
        baseUrl: '/widgets',
        namespace: 'widgets',
        resources,
        singularResourceName: 'widget',
      };

      buildResource({ ...defaultOptions, resources });

      expect(normalizeResources).toHaveBeenCalledWith(expected);
    });

    describe('<Routes />', () => {
      const { Routes } = resource;

      shouldGenerateTheRoutes({
        Routes,
        normalized,
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(resource.options).toEqual({ ...defaultOptions, resources });
      });
    });

    describe('reducer', () => {
      const { reducer } = resource;

      shouldGenerateTheReducer({
        normalized,
        reducer,
      });
    });
  });

  describe('with resources: resource values', () => {
    const CustomCreatePage = () => (<div />);
    const data = { factories: [], widgets: [] };
    const resources = {
      create: { component: CustomCreatePage },
      index: { options: { data } },
      show: { path: '/view' },
      update: true,
    };
    const normalized = {
      create: {
        ...fixtures.create,
        component: CustomCreatePage,
      },
      index: {
        ...fixtures.index,
        options: {
          ...fixtures.index.options,
          data,
        },
        reducer: (state = { data }) => state,
      },
      show: {
        ...fixtures.show,
        path: '/view',
      },
      update: fixtures.update,
    };

    normalizeResources.mockImplementationOnce(() => normalized);

    const resource = buildResource({ ...defaultOptions, resources });

    it('should normalize the resources', () => {
      const expected = {
        ...defaultOptions,
        baseUrl: '/widgets',
        namespace: 'widgets',
        resources,
        singularResourceName: 'widget',
      };

      buildResource({ ...defaultOptions, resources });

      expect(normalizeResources).toHaveBeenCalledWith(expected);
    });

    describe('<Routes />', () => {
      const { Routes } = resource;

      shouldGenerateTheRoutes({
        Routes,
        normalized,
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(resource.options).toEqual({ ...defaultOptions, resources });
      });
    });

    describe('reducer', () => {
      const { reducer } = resource;

      shouldGenerateTheReducer({
        normalized,
        reducer,
      });
    });
  });

  describe('with resources: additional pages', () => {
    const landing = {
      component: LandingPage,
      exact: true,
      options: {},
      path: '/about',
      reducer: null,
    };
    const resources = {
      create: true,
      index: true,
      landing,
      show: true,
      update: true,
    };
    const normalized = {
      ...fixtures,
      landing: {
        ...landing,
        options: { baseUrl: '/widgets' },
      },
    };

    normalizeResources.mockImplementationOnce(() => normalized);

    const resource = buildResource({ ...defaultOptions, resources });

    it('should normalize the resources', () => {
      const expected = {
        ...defaultOptions,
        baseUrl: '/widgets',
        namespace: 'widgets',
        resources,
        singularResourceName: 'widget',
      };

      buildResource({ ...defaultOptions, resources });

      expect(normalizeResources).toHaveBeenCalledWith(expected);
    });

    describe('<Routes />', () => {
      const { Routes } = resource;

      shouldGenerateTheRoutes({
        Routes,
        normalized,
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(resource.options).toEqual({ ...defaultOptions, resources });
      });
    });

    describe('reducer', () => {
      const { reducer } = resource;

      shouldGenerateTheReducer({
        normalized,
        reducer,
      });
    });
  });

  describe('with resources: nested resources', () => {
    const GadgetsPage = () => (<div />);
    const Gadgets = () => (
      <Switch>
        <Route exact path="/widgets/gadgets" component={GadgetsPage} />
      </Switch>
    );
    const gadgets = {
      component: Gadgets,
      exact: false,
      options: {},
      path: '/gadgets',
      reducer: (state = { gadgets: [] }) => state,
    };
    const resources = {
      ...fixtures,
      gadgets,
    };
    const normalized = {
      ...fixtures,
      gadgets: {
        ...gadgets,
        options: { baseUrl: '/widgets' },
      },
    };

    normalizeResources.mockImplementationOnce(() => normalized);

    const resource = buildResource({ ...defaultOptions, resources });

    it('should normalize the resources', () => {
      const expected = {
        ...defaultOptions,
        baseUrl: '/widgets',
        namespace: 'widgets',
        resources,
        singularResourceName: 'widget',
      };

      buildResource({ ...defaultOptions, resources });

      expect(normalizeResources).toHaveBeenCalledWith(expected);
    });

    describe('<Routes />', () => {
      const { Routes } = resource;

      shouldGenerateTheRoutes({
        Routes,
        normalized,
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(resource.options).toEqual({ ...defaultOptions, resources });
      });
    });

    describe('reducer', () => {
      const { reducer } = resource;

      shouldGenerateTheReducer({
        normalized,
        reducer,
      });
    });
  });
});
