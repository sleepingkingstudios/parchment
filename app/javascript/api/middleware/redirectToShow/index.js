import { push } from 'connected-react-router';
import pluralize from 'pluralize';

import {
  dig,
  valueOrDefault,
} from '../../../utils/object';

const defaultSelector = resourceName => data => dig(data, resourceName);

const buildRedirect = (options) => {
  const {
    resourceName,
    singularResourceName,
  } = options;
  const primaryKey = valueOrDefault(options.primaryKey, 'id');
  const baseUrl = valueOrDefault(
    options.baseUrl,
    `/${resourceName}`,
  );
  const selector = valueOrDefault(
    options.selector,
    defaultSelector(singularResourceName),
  );

  return next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const data = dig(response, 'json', 'data');
    const value = valueOrDefault(
      dig(selector(data), 'slug'),
      dig(selector(data), primaryKey),
    );

    dispatch(push(`${baseUrl}/${value}`));
  };
};

const redirectToShow = (options) => {
  const { resourceName } = options;
  const singularResourceName = valueOrDefault(
    options.singularResourceName,
    pluralize.singular(resourceName),
  );
  const { on } = options;
  const middleware = {
    options,
    type: 'api/redirectToShow',
  };
  const redirect = buildRedirect({ ...options, singularResourceName });

  if (on === 'failure') {
    middleware.handleFailure = redirect;
  } else if (on === 'success') {
    middleware.handleSuccess = redirect;
  }

  return middleware;
};

export default redirectToShow;
