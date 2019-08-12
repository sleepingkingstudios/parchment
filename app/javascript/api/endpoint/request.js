import fetch from 'cross-fetch';
import { formatErrors } from '../../components/form/utils';
import {
  camelizeKeys,
  deepAccessProperty,
  underscoreKeys,
  valueOrDefault,
} from '../../utils/object';
import { interpolate } from '../../utils/string';

const getData = ({ namespace, state }) => {
  const segments = namespace.split('/');
  const raw = deepAccessProperty(state, 'data', segments);

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

const extractErrors = json => valueOrDefault(
  deepAccessProperty(json, 'errors', ['error', 'data']), [],
);

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

      handlePending({ dispatch, getState });

      const fullUrl = interpolate(url, /:(\w+)/g, params);
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
