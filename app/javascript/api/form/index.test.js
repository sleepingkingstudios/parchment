import FormEndpoint from './index';
import FormRequest from './request';
import generateActions from './actions';
import generateInitialState from '../endpoint/initialState';

const isConstant = key => (key === key.toUpperCase());

describe('FormEndpoint', () => {
  const defaultOptions = {
    namespace: 'api/endpoint',
    url: '/path/to/endpoint',
  };

  describe('with default options', () => {
    const options = { ...defaultOptions };
    const endpoint = new FormEndpoint(options);
    const {
      actions,
      namespace,
      reducer,
      request,
    } = endpoint;

    describe('actions', () => {
      const expected = generateActions({ namespace });

      it('should generate the actions', () => {
        const properties = Object.entries(actions);

        expect(properties).toHaveLength(10);

        properties.forEach(([key, value]) => {
          if (isConstant(key)) {
            expect(value).toEqual(expected[key]);
          } else {
            expect(typeof value).toEqual('function');
          }
        });
      });
    });

    describe('namespace', () => {
      it('should set the namespace', () => {
        expect(namespace).toEqual(options.namespace);
      });
    });

    describe('reducer', () => {
      it('should generate the reducer', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should set the initial state', () => {
        const state = reducer(undefined, { type: 'test/action' });
        const expected = generateInitialState({});

        expect(state).toEqual(expected);
      });
    });

    describe('request', () => {
      it('should instantiate the request', () => {
        expect(request).toBeInstanceOf(FormRequest);
      });

      it('should set the request method', () => {
        expect(request.method).toEqual('POST');
      });

      it('should set the request url', () => {
        expect(request.url).toEqual(options.url);
      });
    });
  });

  describe('with method: PATCH', () => {
    const options = { ...defaultOptions, method: 'PATCH' };
    const endpoint = new FormEndpoint(options);
    const { request } = endpoint;

    describe('request', () => {
      it('should set the request method', () => {
        expect(request.method).toEqual('PATCH');
      });
    });
  });
});
