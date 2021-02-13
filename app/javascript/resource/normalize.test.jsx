import React from 'react';
import { shallow } from 'enzyme';

import normalizeResources from './normalize';
import buildCreatePage from './pages/create-page';
import buildIndexPage from './pages/index-page';
import buildShowPage from './pages/show-page';
import buildUpdatePage from './pages/update-page';
import {
  Block,
  Form,
  Table,
} from './fixtures';

describe('resource normalizeResources()', () => {
  const baseUrl = '/path/to/widgets';
  const namespace = 'widgets';
  const resourceName = 'widgets';
  const singularResourceName = 'widget';
  const url = '/api/v1/widgets';
  const defaultOptions = {
    Block,
    Form,
    Table,
    baseUrl,
    namespace,
    resourceName,
    singularResourceName,
    url,
  };

  it('should be a function', () => {
    expect(typeof normalizeResources).toEqual('function');
  });

  describe('with default options', () => {
    const applied = normalizeResources(defaultOptions);

    it('should generate the four default pages', () => {
      expect(Object.keys(applied)).toEqual(['create', 'index', 'show', 'update']);
    });

    describe('create', () => {
      const { create } = applied;

      it('should set the default configuration', () => {
        const expected = {
          component: expect.any(Function),
          exact: true,
          options: defaultOptions,
          path: '/create',
          reducer: expect.any(Function),
        };

        expect(create).toEqual(expected);
      });

      it('should set the component to the CreatePage', () => {
        const Page = create.component;
        const rendered = shallow(<Page />);

        expect(rendered).toHaveDisplayName('CreatePage');
        expect(rendered).toHaveProp({ Form });
        expect(rendered).toHaveProp({ baseUrl });
        expect(rendered).toHaveProp({ namespace: `${namespace}/create` });
        expect(rendered).toHaveProp({ resourceName });
        expect(rendered).toHaveProp({ singularResourceName });
        expect(rendered).toHaveProp({ url });
      });

      it('should set the default reducer', () => {
        const createPage = buildCreatePage({
          ...defaultOptions,
          resourceName: singularResourceName,
        });
        const action = { type: 'test/unknownAction' };
        const expected = createPage.reducer(undefined, action);
        const { reducer } = create;
        const state = reducer(undefined, action);

        expect(state).toEqual(expected);
      });
    });

    describe('index', () => {
      const { index } = applied;

      it('should set the default configuration', () => {
        const expected = {
          component: expect.any(Function),
          exact: true,
          options: defaultOptions,
          path: '/',
          reducer: expect.any(Function),
        };

        expect(index).toEqual(expected);
      });

      it('should set the component to the IndexPage', () => {
        const Page = index.component;
        const rendered = shallow(<Page resources={applied} />);

        expect(rendered).toHaveDisplayName('IndexPage');
        expect(rendered).toHaveProp({ Table });
        expect(rendered).toHaveProp({ baseUrl });
        expect(rendered).toHaveProp({ namespace: `${namespace}/index` });
        expect(rendered).toHaveProp({ resourceName });
        expect(rendered).toHaveProp({ singularResourceName });
        expect(rendered).toHaveProp({ url });
      });

      it('should set the default reducer', () => {
        const indexPage = buildIndexPage(defaultOptions);
        const action = { type: 'test/unknownAction' };
        const expected = indexPage.reducer(undefined, action);
        const { reducer } = index;
        const state = reducer(undefined, action);

        expect(state).toEqual(expected);
      });
    });

    describe('show', () => {
      const { show } = applied;

      it('should set the default configuration', () => {
        const expected = {
          component: expect.any(Function),
          exact: true,
          options: defaultOptions,
          path: '/:id',
          reducer: expect.any(Function),
        };

        expect(show).toEqual(expected);
      });

      it('should set the component to the ShowPage', () => {
        const Page = show.component;
        const match = { params: { id: '00000000-0000-0000-0000-000000000000' } };
        const rendered = shallow(<Page match={match} resources={applied} />);

        expect(rendered).toHaveDisplayName('ShowPage');
        expect(rendered).toHaveProp({ Block });
        expect(rendered).toHaveProp({ baseUrl });
        expect(rendered).toHaveProp({ namespace: `${namespace}/show` });
        expect(rendered).toHaveProp({ resourceName });
        expect(rendered).toHaveProp({ singularResourceName });
        expect(rendered).toHaveProp({ url });
      });

      it('should set the default reducer', () => {
        const showPage = buildShowPage({
          ...defaultOptions,
          resourceName: singularResourceName,
        });
        const action = { type: 'test/unknownAction' };
        const expected = showPage.reducer(undefined, action);
        const { reducer } = show;
        const state = reducer(undefined, action);

        expect(state).toEqual(expected);
      });
    });

    describe('update', () => {
      const { update } = applied;

      it('should set the default configuration', () => {
        const expected = {
          component: expect.any(Function),
          exact: true,
          options: defaultOptions,
          path: '/:id/update',
          reducer: expect.any(Function),
        };

        expect(update).toEqual(expected);
      });

      it('should set the component to the UpdatePage', () => {
        const Page = update.component;
        const match = { params: { id: '00000000-0000-0000-0000-000000000000' } };
        const rendered = shallow(<Page match={match} />);

        expect(rendered).toHaveDisplayName('UpdatePage');
        expect(rendered).toHaveProp({ Form });
        expect(rendered).toHaveProp({ baseUrl });
        expect(rendered).toHaveProp({ namespace: `${namespace}/update` });
        expect(rendered).toHaveProp({ resourceName });
        expect(rendered).toHaveProp({ singularResourceName });
        expect(rendered).toHaveProp({ url });
      });

      it('should set the default reducer', () => {
        const updatePage = buildUpdatePage({
          ...defaultOptions,
          resourceName: singularResourceName,
        });
        const action = { type: 'test/unknownAction' };
        const expected = updatePage.reducer(undefined, action);
        const { reducer } = update;
        const state = reducer(undefined, action);

        expect(state).toEqual(expected);
      });
    });
  });

  describe('with resources: booleans', () => {
    const resources = {
      create: false,
      index: true,
    };
    const applied = normalizeResources({ ...defaultOptions, resources });

    it('should generate only the requested pages', () => {
      expect(Object.keys(applied)).toEqual(['index']);
    });

    describe('with an invalid boolean', () => {
      it('should throw an error', () => {
        const expected = 'No default resource defined for landing.';

        expect(() => {
          normalizeResources({ ...defaultOptions, resources: { landing: true } });
        }).toThrow(expected);
      });
    });
  });

  describe('with resources: custom options', () => {
    const CustomIndexPage = () => (<div />);
    const CustomIndexPageWrapper = props => (<CustomIndexPage {...props} />);
    const resources = {
      create: { path: '/new' },
      index: { component: CustomIndexPageWrapper },
      show: { options: { resourceName: 'gadget' } },
      update: { options: { data: { widget: {}, factories: [] } } },
    };
    const applied = normalizeResources({ ...defaultOptions, resources });

    describe('create', () => {
      const { create } = applied;

      it('should merge the custom configuration', () => {
        const expected = {
          component: expect.any(Function),
          exact: true,
          options: defaultOptions,
          path: '/new',
          reducer: expect.any(Function),
        };

        expect(create).toEqual(expected);
      });
    });

    describe('index', () => {
      const { index } = applied;

      it('should set the component to the CustomIndexPage', () => {
        const Page = index.component;
        const rendered = shallow(<Page />);

        expect(rendered).toHaveDisplayName('CustomIndexPage');
      });
    });

    describe('show', () => {
      const { show } = applied;

      it('should merge the custom configuration', () => {
        const expected = {
          component: expect.any(Function),
          exact: true,
          options: {
            ...defaultOptions,
            resourceName: 'gadget',
          },
          path: '/:id',
          reducer: expect.any(Function),
        };

        expect(show).toEqual(expected);
      });

      it('should set the component to the ShowPage', () => {
        const Page = show.component;
        const match = { params: { id: '00000000-0000-0000-0000-000000000000' } };
        const rendered = shallow(<Page match={match} />);

        expect(rendered).toHaveDisplayName('ShowPage');
        expect(rendered).toHaveProp({ resourceName: 'gadget' });
      });

      it('should configure the default reducer', () => {
        const showPage = buildShowPage({
          ...defaultOptions,
          singularResourceName: 'gadget',
        });
        const action = { type: 'test/unknownAction' };
        const expected = showPage.reducer(undefined, action);
        const { reducer } = show;
        const state = reducer(undefined, action);

        expect(state).toEqual(expected);
      });
    });

    describe('update', () => {
      const { update } = applied;

      it('should merge the custom configuration', () => {
        const expected = {
          component: expect.any(Function),
          exact: true,
          options: {
            ...defaultOptions,
            data: { widget: {}, factories: [] },
          },
          path: '/:id/update',
          reducer: expect.any(Function),
        };

        expect(update).toEqual(expected);
      });

      it('should configure the default reducer', () => {
        const updatePage = buildUpdatePage({
          ...defaultOptions,
          data: { widget: {}, factories: [] },
        });
        const action = { type: 'test/unknownAction' };
        const expected = updatePage.reducer(undefined, action);
        const { reducer } = update;
        const state = reducer(undefined, action);

        expect(state).toEqual(expected);
      });
    });
  });

  describe('with resources: custom pages', () => {
    const LandingPage = () => (<div />);
    const LiftoffPage = () => (<div />);
    const liftoffReducer = (state = { fueled: true }) => state;
    const resources = {
      index: true,
      landing: {
        component: LandingPage,
        exact: true,
        options: {},
        path: '/landing',
        reducer: null,
      },
      liftoff: {
        component: LiftoffPage,
        exact: false,
        options: { countdown: 10 },
        path: '/liftoff',
        reducer: liftoffReducer,
      },
    };
    const applied = normalizeResources({ ...defaultOptions, resources });

    it('should generate the configured pages', () => {
      expect(Object.keys(applied)).toEqual(['index', 'landing', 'liftoff']);
    });

    describe('landing', () => {
      const { landing } = applied;

      it('should return the configured resource', () => {
        const expected = {
          component: LandingPage,
          exact: true,
          options: defaultOptions,
          path: '/landing',
          reducer: null,
        };

        expect(landing).toEqual(expected);
      });
    });

    describe('liftoff', () => {
      const { liftoff } = applied;

      it('should return the configured resource', () => {
        const expected = {
          component: LiftoffPage,
          exact: false,
          options: {
            ...defaultOptions,
            countdown: 10,
          },
          path: '/liftoff',
          reducer: liftoffReducer,
        };

        expect(liftoff).toEqual(expected);
      });
    });
  });
});
