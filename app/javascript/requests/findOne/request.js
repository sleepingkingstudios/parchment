import fetch from 'cross-fetch';
import { formatErrors } from '../../components/form/utils';
import {
  camelizeKeys,
  deepAccessProperty,
  valueOrDefault,
} from '../../utils/object';
import { interpolate } from '../../utils/string';

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

class FindOneRequest {
  constructor(options) {
    const {
      actions,
      namespace,
      url,
    } = options;

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
        url,
      } = request;

      handlePending({ dispatch, getState });

      const fullUrl = interpolate(url, /:(\w+)/g, params);

      const rawResponse = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await processResponse(rawResponse);

      if (response.ok) {
        handleSuccess({ dispatch, getState, response });
      } else {
        handleFailure({ dispatch, getState, response });
      }
    };
  }
}

export default FindOneRequest;
