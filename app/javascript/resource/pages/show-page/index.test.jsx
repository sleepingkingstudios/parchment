import React from 'react';
import { shallow } from 'enzyme';

import { INITIALIZED } from 'api/status';
import buildShowPage from './index';

describe('resource buildShowPage()', () => {
  const Block = () => (<div />);
  const namespace = 'path/to/widgets';
  const resourceName = 'widgets';
  const url = 'api/v1/widgets';
  const defaultOptions = {
    Block,
    namespace,
    resourceName,
    url,
  };

  describe('with default options', () => {
    const showPage = buildShowPage(defaultOptions);

    describe('<Page />', () => {
      const { Page } = showPage;
      const id = 'self-sealing-stem-bolt';
      const match = { params: { id } };
      const rendered = shallow(<Page match={match} />);

      it('should be an IndexPage with the configured options', () => {
        expect(rendered).toHaveDisplayName('ShowPage');

        expect(rendered).toHaveProp({ Block });
        expect(rendered).toHaveProp({ baseUrl: '/widgets' });
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
        expect(showPage.options).toEqual(defaultOptions);
      });
    });

    describe('reducer', () => {
      const { reducer } = showPage;

      it('should be a function', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should set the initial state', () => {
        const action = { type: 'test/unknownAction' };
        const expected = {
          data: { data: { widget: {} } },
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
      it('should be resource/pages/index-page', () => {
        expect(showPage.type).toEqual('resource/pages/showPage');
      });
    });
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/tools/widgets';
    const showPage = buildShowPage({ ...defaultOptions, baseUrl });

    describe('<Page />', () => {
      const { Page } = showPage;
      const id = 'self-sealing-stem-bolt';
      const match = { params: { id } };
      const rendered = shallow(<Page match={match} />);

      it('should be an IndexPage with the configured options', () => {
        expect(rendered).toHaveDisplayName('ShowPage');

        expect(rendered).toHaveProp({ Block });
        expect(rendered).toHaveProp({ baseUrl });
        expect(rendered).toHaveProp({ namespace });
        expect(rendered).toHaveProp({ resourceName });
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(showPage.options).toEqual({ ...defaultOptions, baseUrl });
      });
    });
  });

  describe('with singularResourceName: value', () => {
    const singularResourceName = 'gadget';
    const showPage = buildShowPage({ ...defaultOptions, singularResourceName });

    describe('<Page />', () => {
      const { Page } = showPage;
      const id = 'self-sealing-stem-bolt';
      const match = { params: { id } };
      const rendered = shallow(<Page match={match} />);

      it('should be an IndexPage with the configured options', () => {
        expect(rendered).toHaveDisplayName('ShowPage');

        expect(rendered).toHaveProp({ Block });
        expect(rendered).toHaveProp({ baseUrl: '/widgets' });
        expect(rendered).toHaveProp({ namespace });
        expect(rendered).toHaveProp({ resourceName });
        expect(rendered).toHaveProp({ singularResourceName });
      });
    });

    describe('reducer', () => {
      const { reducer } = showPage;

      it('should set the initial state', () => {
        const action = { type: 'test/unknownAction' };
        const expected = {
          data: { data: { gadget: {} } },
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
  });
});
