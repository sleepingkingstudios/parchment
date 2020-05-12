import fetch from 'cross-fetch';
import { formatErrors } from '../../components/form/utils';
import { PENDING } from '../status';
import {
  camelizeKeys,
  dig,
  underscoreKeys,
  valueOrDefault,
} from '../../utils/object';
import { interpolate } from '../../utils/string';

const getData = ({ namespace, state }) => {
  const segments = namespace.split('/');
  const raw = dig(state, ...segments, 'data');

  return underscoreKeys(raw);
};

const buildEmptyResponse = () => ({
  ok: false,
  json: { ok: false },
});

const buildUrl = (url, options) => {
  const wildcards = valueOrDefault(options.wildcards, {});

  return interpolate(url, /:(\w+)/g, wildcards);
};

const extractErrors = json => valueOrDefault(
  dig(json, 'error', 'data', 'errors'),
  [],
);

const getRequestStatus = ({ getState, namespace }) => {
  const state = getState();
  const path = namespace.split('/');

  path.push('status');

  return dig(state, ...path);
};

const processResponse = async (response) => {
  const {
    headers,
    ok,
    status,
    statusText,
  } = response;
  const json = await response.json();

  return {
    headers,
    json,
    ok,
    status,
    statusText,
  };
};

const evaluateMiddleware = (middleware, next, ...args) => {
  if (typeof middleware !== 'function') { return next(...args); }

  return middleware(next)(...args);
};

class ApiRequest {
  constructor(options) {
    const {
      actions,
      method,
      namespace,
      url,
    } = options;

    this.method = method.toUpperCase();
    this.namespace = namespace;
    this.url = url;

    this.defineHandlers = this.defineHandlers.bind(this);
    this.performRequest = this.performRequest.bind(this);

    this.defineHandlers({ actions });
  }

  defineHandlers({ actions }) {
    const {
      requestPending,
      requestFailure,
      requestSuccess,
    } = actions;

    this.buildRequest = ({ getState, method, namespace }) => {
      const request = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (method === 'GET' || method === 'DELETE') { return request; }

      const state = getState();
      const data = getData({ namespace, state });

      return Object.assign(
        request,
        { body: JSON.stringify(data) },
      );
    };

    this.handleFailure = ({ dispatch, response }) => {
      const { json } = response;
      const errors = extractErrors(json);

      dispatch(requestFailure(formatErrors(errors)));
    };

    this.handlePending = ({ dispatch }) => {
      dispatch(requestPending());
    };

    this.handleSuccess = async ({ dispatch, response }) => {
      const { json } = response;

      dispatch(requestSuccess(camelizeKeys(json.data)));
    };
  }

  performRequest(params = {}) {
    const request = this;

    return async (dispatch, getState) => {
      const {
        buildRequest,
        handleFailure,
        handlePending,
        handleSuccess,
        method,
        namespace,
        url,
      } = request;
      const {
        onFailure,
        onPending,
        onRequest,
        onSuccess,
      } = params;
      const requestStatus = getRequestStatus({ getState, namespace });

      if (requestStatus === PENDING) { return; }

      evaluateMiddleware(onPending, handlePending, { dispatch, getState });

      const fullUrl = buildUrl(url, params);
      let response;

      try {
        const rawResponse = await fetch(
          fullUrl,
          evaluateMiddleware(onRequest, buildRequest, { getState, method, namespace }),
        );

        response = await processResponse(rawResponse);
      } catch (error) {
        response = buildEmptyResponse();

        if (onFailure) {
          onFailure(handleFailure)({ dispatch, getState, response });
        } else {
          handleFailure({ dispatch, getState, response });
        }

        return;
      }

      if (response.ok) {
        evaluateMiddleware(onSuccess, handleSuccess, { dispatch, getState, response });
      } else {
        evaluateMiddleware(onFailure, handleFailure, { dispatch, getState, response });
      }
    };
  }
}

export default ApiRequest;
