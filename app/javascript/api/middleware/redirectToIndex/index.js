import { push } from 'connected-react-router';

import { valueOrDefault } from '../../../utils/object';

const buildRedirect = (options) => {
  const { resourceName } = options;
  const baseUrl = valueOrDefault(
    options.baseUrl,
    `/${resourceName}`,
  );

  return next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    dispatch(push(baseUrl));
  };
};

const redirectToIndex = (options) => {
  const { on } = options;
  const middleware = {
    options,
    type: 'api/redirectToIndex',
  };

  if (on === 'failure') {
    middleware.handleFailure = buildRedirect(options);
  } else if (on === 'success') {
    middleware.handleSuccess = buildRedirect(options);
  }

  return middleware;
};

export default redirectToIndex;
