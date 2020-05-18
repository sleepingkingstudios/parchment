import { push } from 'connected-react-router';

import redirectToShow from './index';
import {
  dig,
  valueOrDefault,
} from '../../../utils/object';

const shouldCallTheNextFunction = (fn, props, expected) => {
  it('should call the next function', () => {
    const next = jest.fn();

    fn(next)(props);

    expect(next).toHaveBeenCalledWith(valueOrDefault(expected, props));
  });
};

describe('RedirectToShow middleware', () => {
  const resourceName = 'widget';

  it('should be a function', () => {
    expect(typeof redirectToShow).toEqual('function');
  });

  describe('with no arguments', () => {
    it('should return an empty object', () => {
      expect(redirectToShow({})).toEqual({});
    });
  });

  describe('with on: failure', () => {
    const middleware = redirectToShow({ resourceName, on: 'failure' });
    const { handleFailure } = middleware;

    it('should not define handleSuccess()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    describe('handleFailure()', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const data = { widget: { id } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
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

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${id}`;

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });
  });

  describe('with on: failure and baseUrl: value', () => {
    const baseUrl = '/path/to/widgets';
    const middleware = redirectToShow({ resourceName, baseUrl, on: 'failure' });
    const { handleFailure } = middleware;

    describe('handleFailure()', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const data = { widget: { id } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
      };

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/path/to/widgets/${id}`;

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });
  });

  describe('with on: failure and primaryKey: value', () => {
    const primaryKey = 'slug';
    const middleware = redirectToShow({ resourceName, primaryKey, on: 'failure' });
    const { handleFailure } = middleware;

    describe('handleFailure()', () => {
      const slug = 'self-sealing-stem-bolt';
      const data = { widget: { slug } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
      };

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${slug}`;

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });
  });

  describe('with on: failure and selector: function', () => {
    const selector = data => dig(data, 'widgets', 'small', 'bolts');
    const middleware = redirectToShow({ resourceName, selector, on: 'failure' });
    const { handleFailure } = middleware;

    describe('handleFailure()', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const data = { widgets: { small: { bolts: { id } } } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
      };

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${id}`;

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });
  });

  describe('with on: success', () => {
    const middleware = redirectToShow({ resourceName, on: 'success' });
    const { handleSuccess } = middleware;

    it('should not define handleFailure()', () => {
      expect(middleware.handleFailure).toBeUndefined();
    });

    describe('handleSuccess()', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const data = { widget: { id } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
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

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${id}`;

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });
  });

  describe('with on: success and baseUrl: value', () => {
    const baseUrl = '/path/to/widgets';
    const middleware = redirectToShow({ resourceName, baseUrl, on: 'success' });
    const { handleSuccess } = middleware;

    describe('handleSuccess()', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const data = { widget: { id } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
      };

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/path/to/widgets/${id}`;

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });
  });

  describe('with on: success and primaryKey: value', () => {
    const primaryKey = 'slug';
    const middleware = redirectToShow({ resourceName, primaryKey, on: 'success' });
    const { handleSuccess } = middleware;

    describe('handleSuccess()', () => {
      const slug = 'self-sealing-stem-bolt';
      const data = { widget: { slug } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
      };

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${slug}`;

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });
  });

  describe('with on: success and selector: function', () => {
    const selector = data => dig(data, 'widgets', 'small', 'bolts');
    const middleware = redirectToShow({ resourceName, selector, on: 'success' });
    const { handleSuccess } = middleware;

    describe('handleSuccess()', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const data = { widgets: { small: { bolts: { id } } } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
      };

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${id}`;

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });
    });
  });
});
