import fetch from 'cross-fetch';

import { underscoreKeys } from 'utils/object';
import generateActions from '../actions';
import generateRequest from './index';
import {
  shouldHandleTheResponse,
  shouldPerformTheRequest,
} from './testHelpers';

jest.mock('cross-fetch');

describe('API client generateRequest()', () => {
  const namespace = 'path/to/widgets';
  const actions = generateActions({ namespace });
  const defaultOptions = {
    method: 'GET',
    namespace,
    url: '/api/widgets',
  };
  const data = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Self-Sealing Stem Bolt',
    cargoType: 'Trade Goods',
    quantity: 50,
  };

  const shouldGenerateTheApiRequest = ({ body, method }) => {
    describe('with default options', () => {
      const options = { ...defaultOptions, actions, method };
      const performRequest = generateRequest(options);
      const { url } = options;

      it('should be a function', () => {
        expect(typeof performRequest).toEqual('function');
      });

      it('should return a function', () => {
        const { id } = data;

        expect(typeof performRequest({ id })).toEqual('function');
      });

      shouldPerformTheRequest({
        body,
        fetch,
        method,
        namespace,
        performRequest,
        url,
      });

      shouldHandleTheResponse({
        actions,
        fetch,
        namespace,
        performRequest,
      });
    });

    describe('with middleware: array', () => {
      const addHeader = headers => next => (opts) => {
        const request = next(opts);

        return Object.assign(
          {},
          request,
          {
            headers: Object.assign(
              {},
              request.headers,
              headers,
            ),
          },
        );
      };
      const generateMiddleware = label => next => (opts) => {
        const { dispatch } = opts;

        dispatch({ type: `${label}/before` });

        next(opts);

        dispatch({ type: `${label}/after` });
      };
      const middleware = [
        {
          buildRequest: addHeader({ 'Header-A': 'header A' }),
        },
        {
          handleFailure: generateMiddleware('b/failure'),
        },
        {
          handlePending: generateMiddleware('c/pending'),
        },
        {
          handleSuccess: generateMiddleware('d/success'),
        },
        {
          buildRequest: addHeader({ 'Header-E': 'header E' }),
          handleFailure: generateMiddleware('e/failure'),
          handlePending: generateMiddleware('e/pending'),
          handleSuccess: generateMiddleware('e/success'),
        },
      ];
      const options = {
        ...defaultOptions,
        actions,
        method,
        middleware,
      };
      const performRequest = generateRequest(options);
      const { url } = options;

      shouldPerformTheRequest({
        body,
        fetch,
        headers: {
          'Header-A': 'header A',
          'Content-Type': 'application/json',
          'Header-E': 'header E',
        },
        method,
        namespace,
        performRequest,
        url,
      });

      shouldHandleTheResponse({
        actions,
        fetch,
        middleware,
        namespace,
        performRequest,
      });
    });

    describe('with url: with wildcards', () => {
      const options = {
        ...defaultOptions,
        actions,
        method,
        url: '/colors/:color/hues/:id',
      };
      const performRequest = generateRequest(options);
      const wildcards = { color: 'red', id: '0' };

      shouldPerformTheRequest({
        body,
        fetch,
        method,
        namespace,
        params: { wildcards },
        performRequest,
        url: '/colors/red/hues/0',
      });
    });
  };

  beforeEach(() => { fetch.mockClear(); });

  describe('with method: DELETE', () => {
    const method = 'DELETE';

    shouldGenerateTheApiRequest({ method });
  });

  describe('with method: GET', () => {
    const method = 'GET';

    shouldGenerateTheApiRequest({ method });
  });

  describe('with method: PATCH', () => {
    const method = 'PATCH';
    const body = JSON.stringify(underscoreKeys(data));

    shouldGenerateTheApiRequest({ body, method });
  });

  describe('with method: POST', () => {
    const method = 'POST';
    const body = JSON.stringify(underscoreKeys(data));

    shouldGenerateTheApiRequest({ body, method });
  });

  describe('with method: PUT', () => {
    const method = 'PUT';
    const body = JSON.stringify(underscoreKeys(data));

    shouldGenerateTheApiRequest({ body, method });
  });
});
