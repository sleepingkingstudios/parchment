import { push } from 'connected-react-router';

import redirectToIndex from './index';
import {
  shouldCallTheNextFunction,
} from '../testHelpers';

describe('RedirectToShow middleware', () => {
  const resourceName = 'widgets';

  it('should be a function', () => {
    expect(typeof redirectToIndex).toEqual('function');
  });

  describe('with no arguments', () => {
    const middleware = redirectToIndex({});
    const { options, type } = middleware;

    it('should not define handleFailure()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    it('should not define handleSuccess()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    describe('options', () => {
      it('should return an empty object', () => {
        expect(options).toEqual({});
      });
    });

    describe('type', () => {
      it('should be "api/redirectToShow"', () => {
        expect(type).toEqual('api/redirectToIndex');
      });
    });
  });

  describe('with on: failure', () => {
    const middleware = redirectToIndex({ resourceName, on: 'failure' });
    const { handleFailure, options } = middleware;

    it('should not define handleSuccess()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    describe('handleFailure()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: {},
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should be a function', () => {
        expect(typeof handleFailure).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleFailure(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handleFailure, props);

      it('should redirect to the index page', () => {
        const next = jest.fn();
        const url = '/widgets';

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, on: 'failure' });
      });
    });
  });

  describe('with on: failure and baseUrl: value', () => {
    const baseUrl = '/path/to/widgets';
    const middleware = redirectToIndex({ resourceName, baseUrl, on: 'failure' });
    const { handleFailure, options } = middleware;

    describe('handleFailure()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: {},
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should redirect to the index page', () => {
        const next = jest.fn();

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(baseUrl));
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, baseUrl, on: 'failure' });
      });
    });
  });

  describe('with on: success', () => {
    const middleware = redirectToIndex({ resourceName, on: 'success' });
    const { handleSuccess, options } = middleware;

    it('should not define handleFailure()', () => {
      expect(middleware.handleFailure).toBeUndefined();
    });

    describe('handleSuccess()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: {},
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleSuccess(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handleSuccess, props);

      it('should redirect to the index page', () => {
        const next = jest.fn();
        const url = '/widgets';

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, on: 'success' });
      });
    });
  });

  describe('with on: success and baseUrl: value', () => {
    const baseUrl = '/path/to/widgets';
    const middleware = redirectToIndex({ resourceName, baseUrl, on: 'success' });
    const { handleSuccess, options } = middleware;

    describe('handleSuccess()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: {},
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should redirect to the index page', () => {
        const next = jest.fn();

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(baseUrl));
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, baseUrl, on: 'success' });
      });
    });
  });
});
