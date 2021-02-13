import React from 'react';
import { shallow } from 'enzyme';

import { INITIALIZED } from 'api/status';
import buildIndexPage from './index';

describe('resource buildIndexPage()', () => {
  const Table = () => (<div />);
  const namespace = 'path/to/widgets';
  const resourceName = 'widgets';
  const resources = {
    create: true,
    index: true,
    show: true,
    update: true,
  };
  const url = '/api/v1/widgets';
  const defaultOptions = {
    Table,
    namespace,
    resourceName,
    resources,
    url,
  };

  describe('with default options', () => {
    const indexPage = buildIndexPage(defaultOptions);

    describe('<Page />', () => {
      const { Page } = indexPage;
      const rendered = shallow(<Page />);

      it('should be an IndexPage with the configured options', () => {
        expect(rendered).toHaveDisplayName('IndexPage');

        expect(rendered).toHaveProp({ Table });
        expect(rendered).toHaveProp({ namespace });
        expect(rendered).toHaveProp({ resourceName });
        expect(rendered).toHaveProp({ singularResourceName: 'widget' });
      });

      it('should pass the store hooks', () => {
        const hooks = {
          useData: expect.any(Function),
          useDataStatus: expect.any(Function),
          useDestroyRequest: expect.any(Function),
          useRequestData: expect.any(Function),
        };

        expect(rendered).toHaveProp({ hooks });
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(indexPage.options).toEqual(defaultOptions);
      });
    });

    describe('reducer', () => {
      const { reducer } = indexPage;

      it('should be a function', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should set the initial state', () => {
        const action = { type: 'test/unknownAction' };
        const expected = {
          data: { data: { widgets: [] } },
          destroy: {
            data: {},
            errors: {},
            status: INITIALIZED,
          },
          find: {
            data: {},
            errors: {},
            status: INITIALIZED,
          },
        };

        expect(reducer(undefined, action)).toEqual(expected);
      });
    });

    describe('type', () => {
      it('should be resource/pages/indexPage', () => {
        expect(indexPage.type).toEqual('resource/pages/indexPage');
      });
    });
  });

  describe('with singularResourceName: value', () => {
    const singularResourceName = 'gadget';
    const indexPage = buildIndexPage({ ...defaultOptions, singularResourceName });

    describe('<Page />', () => {
      const { Page } = indexPage;
      const rendered = shallow(<Page />);

      it('should be an IndexPage with the configured options', () => {
        expect(rendered).toHaveDisplayName('IndexPage');

        expect(rendered).toHaveProp({ Table });
        expect(rendered).toHaveProp({ namespace });
        expect(rendered).toHaveProp({ resourceName });
        expect(rendered).toHaveProp({ singularResourceName });
      });

      it('should pass the store hooks', () => {
        const hooks = {
          useData: expect.any(Function),
          useDataStatus: expect.any(Function),
          useDestroyRequest: expect.any(Function),
          useRequestData: expect.any(Function),
        };

        expect(rendered).toHaveProp({ hooks });
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(indexPage.options).toEqual({ ...defaultOptions, singularResourceName });
      });
    });
  });
});
