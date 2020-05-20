import { push } from 'connected-react-router';
import pluralize from 'pluralize';

import {
  dig,
  valueOrDefault,
} from '../../../utils/object';

const defaultSelector = resourceName => data => dig(data, resourceName);

const buildRedirect = (options) => {
  const { resourceName } = options;
  const primaryKey = valueOrDefault(options.primaryKey, 'id');
  const baseUrl = valueOrDefault(
    options.baseUrl,
    `/${pluralize(resourceName)}`,
  );
  const selector = valueOrDefault(
    options.selector,
    defaultSelector(resourceName),
  );

  return next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const data = dig(response, 'json', 'data');
    const value = dig(selector(data), primaryKey);

    dispatch(push(`${baseUrl}/${value}`));
  };
};

const redirectToShow = (options) => {
  const { on } = options;
  const middleware = {
    options,
    type: 'api/redirectToShow',
  };

  if (on === 'failure') {
    middleware.handleFailure = buildRedirect(options);
  } else if (on === 'success') {
    middleware.handleSuccess = buildRedirect(options);
  }

  return middleware;
};

export default redirectToShow;
