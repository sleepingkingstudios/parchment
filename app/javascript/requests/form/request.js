import fetch from 'cross-fetch';
import { formatErrors } from '../../components/form/utils';
import {
  camelizeKeys,
  underscoreKeys,
} from '../../utils/object';

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

class FormRequest {
  constructor({ actions, namespace, url }) {
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
      const { errors } = json;

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

  performRequest() {
    const request = this;

    return async (dispatch, getState) => {
      const {
        handleFailure,
        handlePending,
        handleSuccess,
        namespace,
        url,
      } = request;

      handlePending({ dispatch, getState });

      const state = getState();
      const data = underscoreKeys(state[namespace].data);

      const rawResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
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

export default FormRequest;
