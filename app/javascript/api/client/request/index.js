import fetch from 'cross-fetch';

import {
  applyMiddleware,
  selectMiddleware,
  wrapMiddleware,
} from 'api/middleware/utils';
import { PENDING } from 'api/status';
import {
  dig,
  valueOrDefault,
} from 'utils/object';
import { interpolate } from 'utils/string';
import buildEmptyResponse from './emptyResponse';
import buildOptions from './options';
import generateHandlers from './handlers';
import processResponse from './response';

const buildUrl = (url, options) => {
  const wildcards = valueOrDefault(options.wildcards, {});

  return interpolate(url, /:(\w+)/g, wildcards);
};

const getRequestStatus = ({ getState, namespace }) => {
  const state = getState();
  const path = namespace.split('/');

  path.push('status');

  return dig(state, ...path);
};

const generateRequest = (options) => {
  const {
    actions,
    middleware,
    namespace,
    url,
  } = options;
  const method = options.method.toUpperCase();
  const handlers = generateHandlers({ actions, middleware });
  const actualMiddleware = valueOrDefault(middleware, []);
  const buildOptionsWithMiddleware = applyMiddleware(
    buildOptions,
    selectMiddleware(actualMiddleware, 'buildRequest'),
  );

  return (params = {}) => async (dispatch, getState) => {
    const {
      handleFailure,
      handlePending,
      handleSuccess,
    } = handlers;
    const {
      onFailure,
      onPending,
      onRequest,
      onSuccess,
    } = params;

    if (getRequestStatus({ getState, namespace }) === PENDING) { return; }

    wrapMiddleware(onPending, handlePending)({ dispatch, getState });

    const fullUrl = buildUrl(url, params);
    let response;

    try {
      const request = wrapMiddleware(
        onRequest,
        buildOptionsWithMiddleware,
      )({ getState, method, namespace });

      response = await fetch(fullUrl, request);
      response = await processResponse(response);
    } catch (error) {
      response = buildEmptyResponse({ error: { message: error.toString() } });

      wrapMiddleware(onFailure, handleFailure)({ dispatch, getState, response });

      return;
    }

    if (response.ok) {
      wrapMiddleware(onSuccess, handleSuccess)({ dispatch, getState, response });
    } else {
      wrapMiddleware(onFailure, handleFailure)({ dispatch, getState, response });
    }
  };
};

export default generateRequest;
