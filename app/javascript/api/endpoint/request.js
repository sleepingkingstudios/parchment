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

const buildRequest = ({ getState, method, namespace }) => {
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
        handleFailure,
        handlePending,
        handleSuccess,
        method,
        namespace,
        url,
      } = request;

      const requestStatus = getRequestStatus({ getState, namespace });

      if (requestStatus === PENDING) { return; }

      handlePending({ dispatch, getState });

      const fullUrl = buildUrl(url, params);
      const rawResponse = await fetch(
        fullUrl,
        buildRequest({
          getState,
          method,
          namespace,
        }),
      );
      const response = await processResponse(rawResponse);

      if (response.ok) {
        handleSuccess({ dispatch, getState, response });
      } else {
        handleFailure({ dispatch, getState, response });
      }
    };
  }
}

export default ApiRequest;
