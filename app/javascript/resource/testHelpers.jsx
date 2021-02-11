/* eslint-env jest */

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';

import { exists } from 'utils/object';

export const shouldGenerateTheReducer = (options) => {
  const {
    normalized,
    reducer,
  } = options;

  it('should be a function', () => {
    expect(typeof reducer).toEqual('function');
  });

  describe('initialState', () => {
    const action = { type: 'test/unknownAction' };
    const expected = Object.entries(normalized).reduce(
      (state, tuple) => {
        const [key, resource] = tuple;

        if (!exists(resource.reducer)) { return state; }

        const local = {};
        local[key] = resource.reducer(undefined, action);

        return Object.assign(local, state);
      },
      {},
    );
    const initialState = reducer(undefined, action);

    it('should return the initial state', () => {
      expect(initialState).toEqual(expected);
    });
  });
};

export const shouldGenerateTheRoutes = ({ Routes, normalized }) => {
  const rendered = shallow(<Routes />);

  const qualifiedPath = (baseUrl, path) => (
    `/${baseUrl}/${path}`.replace(/\/+/g, '/').replace(/\/$/, '')
  );
  const renderComponent = (route) => {
    const Component = route.prop('component');

    return shallow(<Component />);
  };

  it('should return a Switch', () => {
    expect(rendered.find('Switch')).toExist();
  });

  Object.entries(normalized).forEach(([key, resource]) => {
    describe(key, () => {
      const {
        exact,
        options,
        path,
      } = resource;
      const { baseUrl } = options;
      const qualified = qualifiedPath(baseUrl, path);
      const route = rendered.find({ path: qualified });

      it('should have a matching route', () => {
        expect(route).toExist();
        expect(route).toHaveDisplayName('Route');
        expect(route).toHaveProp({ exact });
        expect(route).toHaveProp({ path: qualified });
      });

      it('should inject the component with the options', () => {
        const component = renderComponent(route);

        expect(component).toHaveDisplayName(resource.component.name);

        Object.entries(options).forEach(([prop, value]) => {
          expect(component).toHaveProp(prop, value);
        });
      });
    });
  });
};
