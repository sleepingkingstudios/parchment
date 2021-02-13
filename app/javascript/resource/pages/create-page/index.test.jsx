import React from 'react';
import { shallow } from 'enzyme';

import { INITIALIZED } from 'api/status';
import buildCreatePage from './index';

describe('resource buildCreatePage()', () => {
  const Form = () => (<div />);
  const namespace = 'path/to/widgets';
  const resourceName = 'widgets';
  const url = '/api/v1/widgets';
  const defaultOptions = {
    Form,
    namespace,
    resourceName,
    url,
  };

  describe('with default options', () => {
    const createPage = buildCreatePage(defaultOptions);

    describe('<Page />', () => {
      const { Page } = createPage;
      const rendered = shallow(<Page />);

      it('should be a CreatePage with the configured options', () => {
        expect(rendered).toHaveDisplayName('CreatePage');

        expect(rendered).toHaveProp({ Form });
        expect(rendered).toHaveProp({ namespace });
        expect(rendered).toHaveProp({ resourceName });
        expect(rendered).toHaveProp({ singularResourceName: 'widget' });
      });

      it('should pass the store hooks', () => {
        const hooks = {
          useForm: expect.any(Function),
          useSubmitRequest: expect.any(Function),
          useSubmitStatus: expect.any(Function),
          useUpdateForm: expect.any(Function),
        };

        expect(rendered).toHaveProp({ hooks });
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(createPage.options).toEqual(defaultOptions);
      });
    });

    describe('reducer', () => {
      const { reducer } = createPage;

      it('should be a function', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should set the initial state', () => {
        const action = { type: 'test/unknownAction' };
        const expected = {
          form: {
            data: { widget: {} },
            errors: {},
          },
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
      it('should be resource/pages/createPage', () => {
        expect(createPage.type).toEqual('resource/pages/createPage');
      });
    });
  });

  describe('with data: value', () => {
    const data = {
      factory: {},
      widget: {},
    };
    const createPage = buildCreatePage({ ...defaultOptions, data });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(createPage.options).toEqual({ ...defaultOptions, data });
      });
    });

    describe('reducer', () => {
      const { reducer } = createPage;

      it('should be a function', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should set the initial state', () => {
        const action = { type: 'test/unknownAction' };
        const expected = {
          form: {
            data,
            errors: {},
          },
          submit: {
            data: {},
            errors: {},
            status: INITIALIZED,
          },
        };

        expect(reducer(undefined, action)).toEqual(expected);
      });
    });
  });

  describe('with singularResourceName: value', () => {
    const singularResourceName = 'gadget';
    const createPage = buildCreatePage({ ...defaultOptions, singularResourceName });

    describe('<Page />', () => {
      const { Page } = createPage;
      const rendered = shallow(<Page />);

      it('should be a CreatePage with the configured options', () => {
        expect(rendered).toHaveDisplayName('CreatePage');

        expect(rendered).toHaveProp({ Form });
        expect(rendered).toHaveProp({ namespace });
        expect(rendered).toHaveProp({ resourceName });
        expect(rendered).toHaveProp({ singularResourceName });
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(createPage.options).toEqual({ ...defaultOptions, singularResourceName });
      });
    });

    describe('reducer', () => {
      const { reducer } = createPage;

      it('should set the initial state', () => {
        const action = { type: 'test/unknownAction' };
        const expected = {
          form: {
            data: { gadget: {} },
            errors: {},
          },
          submit: {
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
