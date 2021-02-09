import { push } from 'connected-react-router';

import redirectToShow from './index';
import { dig } from '../../../utils/object';
import {
  shouldCallTheNextFunction,
} from '../testHelpers';

const buildProps = data => ({
  dispatch: jest.fn(),
  getState: jest.fn(),
  response: { json: { data } },
});

describe('RedirectToShow middleware', () => {
  const resourceName = 'widgets';

  it('should be a function', () => {
    expect(typeof redirectToShow).toEqual('function');
  });

  describe('with no callbacks', () => {
    const middleware = redirectToShow({ resourceName });
    const { options, type } = middleware;

    it('should not define handleFailure()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    it('should not define handleSuccess()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(options).toEqual({ resourceName });
      });
    });

    describe('type', () => {
      it('should be "api/redirectToShow"', () => {
        expect(type).toEqual('api/redirectToShow');
      });
    });
  });

  describe('with on: failure', () => {
    const middleware = redirectToShow({ resourceName, on: 'failure' });
    const { handleFailure, options } = middleware;

    it('should not define handleSuccess()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    describe('handleFailure()', () => {
      const id = '00000000-0000-0000-0000-000000000000';

      it('should be a function', () => {
        expect(typeof handleFailure).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleFailure(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handleFailure, buildProps({ widget: { id } }));

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${id}`;
        const props = buildProps({ widget: { id } });

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });

      describe('when the data has a slug', () => {
        const slug = 'self-sealing-stem-bolt';

        it('should redirect to the show page', () => {
          const next = jest.fn();
          const url = `/widgets/${slug}`;
          const props = buildProps({ widget: { slug } });

          handleFailure(next)(props);

          expect(props.dispatch).toHaveBeenCalledWith(push(url));
        });
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
    const middleware = redirectToShow({ resourceName, baseUrl, on: 'failure' });
    const { handleFailure, options } = middleware;

    describe('handleFailure()', () => {
      const id = '00000000-0000-0000-0000-000000000000';

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/path/to/widgets/${id}`;
        const props = buildProps({ widget: { id } });

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });

      describe('when the data has a slug', () => {
        const slug = 'self-sealing-stem-bolt';

        it('should redirect to the show page', () => {
          const next = jest.fn();
          const url = `/path/to/widgets/${slug}`;
          const props = buildProps({ widget: { slug } });

          handleFailure(next)(props);

          expect(props.dispatch).toHaveBeenCalledWith(push(url));
        });
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, baseUrl, on: 'failure' });
      });
    });
  });

  describe('with on: failure and primaryKey: value', () => {
    const primaryKey = 'uuid';
    const middleware = redirectToShow({ resourceName, primaryKey, on: 'failure' });
    const { handleFailure, options } = middleware;

    describe('handleFailure()', () => {
      const uuid = '00000000-0000-0000-0000-000000000000';

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${uuid}`;
        const props = buildProps({ widget: { uuid } });

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });

      describe('when the data has a slug', () => {
        const slug = 'self-sealing-stem-bolt';

        it('should redirect to the show page', () => {
          const next = jest.fn();
          const url = `/widgets/${slug}`;
          const props = buildProps({ widget: { slug } });

          handleFailure(next)(props);

          expect(props.dispatch).toHaveBeenCalledWith(push(url));
        });
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, primaryKey, on: 'failure' });
      });
    });
  });

  describe('with on: failure and selector: function', () => {
    const selector = data => dig(data, 'widgets', 'small', 'bolts');
    const middleware = redirectToShow({ resourceName, selector, on: 'failure' });
    const { handleFailure, options } = middleware;

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

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, selector, on: 'failure' });
      });
    });
  });

  describe('with on: success', () => {
    const middleware = redirectToShow({ resourceName, on: 'success' });
    const { handleSuccess, options } = middleware;

    it('should not define handleFailure()', () => {
      expect(middleware.handleFailure).toBeUndefined();
    });

    describe('handleSuccess()', () => {
      const id = '00000000-0000-0000-0000-000000000000';

      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleSuccess(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handleSuccess, buildProps({ widget: { id } }));

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${id}`;
        const props = buildProps({ widget: { id } });

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });

      describe('when the data has a slug', () => {
        const slug = 'self-sealing-stem-bolt';

        it('should redirect to the show page', () => {
          const next = jest.fn();
          const url = `/widgets/${slug}`;
          const props = buildProps({ widget: { slug } });

          handleSuccess(next)(props);

          expect(props.dispatch).toHaveBeenCalledWith(push(url));
        });
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
    const middleware = redirectToShow({ resourceName, baseUrl, on: 'success' });
    const { handleSuccess, options } = middleware;

    describe('handleSuccess()', () => {
      const id = '00000000-0000-0000-0000-000000000000';

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/path/to/widgets/${id}`;
        const props = buildProps({ widget: { id } });

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });

      describe('when the data has a slug', () => {
        const slug = 'self-sealing-stem-bolt';

        it('should redirect to the show page', () => {
          const next = jest.fn();
          const url = `/path/to/widgets/${slug}`;
          const props = buildProps({ widget: { slug } });

          handleSuccess(next)(props);

          expect(props.dispatch).toHaveBeenCalledWith(push(url));
        });
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, baseUrl, on: 'success' });
      });
    });
  });

  describe('with on: success and primaryKey: value', () => {
    const primaryKey = 'uuid';
    const middleware = redirectToShow({ resourceName, primaryKey, on: 'success' });
    const { handleSuccess, options } = middleware;

    describe('handleSuccess()', () => {
      const uuid = '00000000-0000-0000-0000-000000000000';

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${uuid}`;
        const props = buildProps({ widget: { uuid } });

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });

      describe('when the data has a slug', () => {
        const slug = 'self-sealing-stem-bolt';

        it('should redirect to the show page', () => {
          const next = jest.fn();
          const url = `/widgets/${slug}`;
          const props = buildProps({ widget: { slug } });

          handleSuccess(next)(props);

          expect(props.dispatch).toHaveBeenCalledWith(push(url));
        });
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, primaryKey, on: 'success' });
      });
    });
  });

  describe('with on: success and selector: function', () => {
    const selector = data => dig(data, 'widgets', 'small', 'bolts');
    const middleware = redirectToShow({ resourceName, selector, on: 'success' });
    const { handleSuccess, options } = middleware;

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

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, selector, on: 'success' });
      });
    });
  });

  describe('with singularResourceName: value and on: :failure', () => {
    const singularResourceName = 'gadget';
    const middleware = redirectToShow({
      resourceName,
      singularResourceName,
      on: 'failure',
    });
    const { handleFailure, options } = middleware;

    describe('handleFailure()', () => {
      const id = '00000000-0000-0000-0000-000000000000';

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${id}`;
        const props = buildProps({ gadget: { id } });

        handleFailure(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });

      describe('when the data has a slug', () => {
        const slug = 'self-sealing-stem-bolt';

        it('should redirect to the show page', () => {
          const next = jest.fn();
          const url = `/widgets/${slug}`;
          const props = buildProps({ gadget: { slug } });

          handleFailure(next)(props);

          expect(props.dispatch).toHaveBeenCalledWith(push(url));
        });
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, singularResourceName, on: 'failure' });
      });
    });
  });

  describe('with singularResourceName: value and on: :success', () => {
    const singularResourceName = 'gadget';
    const middleware = redirectToShow({
      resourceName,
      singularResourceName,
      on: 'success',
    });
    const { handleSuccess, options } = middleware;

    describe('handleSuccess()', () => {
      const id = '00000000-0000-0000-0000-000000000000';

      it('should redirect to the show page', () => {
        const next = jest.fn();
        const url = `/widgets/${id}`;
        const props = buildProps({ gadget: { id } });

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(push(url));
      });

      describe('when the data has a slug', () => {
        const slug = 'self-sealing-stem-bolt';

        it('should redirect to the show page', () => {
          const next = jest.fn();
          const url = `/widgets/${slug}`;
          const props = buildProps({ gadget: { slug } });

          handleSuccess(next)(props);

          expect(props.dispatch).toHaveBeenCalledWith(push(url));
        });
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(options).toEqual({ resourceName, singularResourceName, on: 'success' });
      });
    });
  });
});
