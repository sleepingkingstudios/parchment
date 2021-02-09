import React from 'react';
import { shallow } from 'enzyme';

import { INITIALIZED } from 'api/status';
import buildUpdatePage from './index';

describe('resource buildUpdatePage()', () => {
  const Form = () => (<div />);
  const namespace = 'path/to/widgets';
  const resourceName = 'widget';
  const url = 'api/v1/widgets';
  const defaultOptions = {
    Form,
    namespace,
    resourceName,
    url,
  };

  describe('with default options', () => {
    const updatePage = buildUpdatePage(defaultOptions);

    describe('<Page />', () => {
      const { Page } = updatePage;
      const id = 'self-sealing-stem-bolt';
      const match = { params: { id } };
      const rendered = shallow(<Page match={match} />);

      it('should be an IndexPage with the configured options', () => {
        expect(rendered).toHaveDisplayName('UpdatePage');

        expect(rendered).toHaveProp({ Form });
        expect(rendered).toHaveProp({ baseUrl: '/widgets' });
        expect(rendered).toHaveProp({ namespace });
        expect(rendered).toHaveProp({ resourceName });
      });

      it('should pass the store hooks', () => {
        const hooks = {
          useDataStatus: expect.any(Function),
          useForm: expect.any(Function),
          useRequestData: expect.any(Function),
          useSubmitRequest: expect.any(Function),
          useSubmitStatus: expect.any(Function),
          useUpdateForm: expect.any(Function),
        };

        expect(rendered).toHaveProp({ hooks });
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(updatePage.options).toEqual(defaultOptions);
      });
    });

    describe('reducer', () => {
      const { reducer } = updatePage;

      it('should be a function', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should set the initial state', () => {
        const action = { type: 'test/unknownAction' };
        const expected = {
          find: {
            data: {},
            errors: {},
            status: INITIALIZED,
          },
          form: { data: { widget: {} }, errors: {} },
          submit: {
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
        expect(updatePage.type).toEqual('resource/pages/updatePage');
      });
    });
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/tools/widgets';
    const updatePage = buildUpdatePage({ ...defaultOptions, baseUrl });

    describe('<Page />', () => {
      const { Page } = updatePage;
      const id = 'self-sealing-stem-bolt';
      const match = { params: { id } };
      const rendered = shallow(<Page match={match} />);

      it('should be an IndexPage with the configured options', () => {
        expect(rendered).toHaveDisplayName('UpdatePage');

        expect(rendered).toHaveProp({ Form });
        expect(rendered).toHaveProp({ baseUrl });
        expect(rendered).toHaveProp({ namespace });
        expect(rendered).toHaveProp({ resourceName });
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(updatePage.options).toEqual({ ...defaultOptions, baseUrl });
      });
    });
  });
});
