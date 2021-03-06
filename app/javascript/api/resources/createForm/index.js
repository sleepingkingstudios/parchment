import pluralize from 'pluralize';

import FormEndpoint from '../../form';
import authorization from '../../middleware/authorization';
import generateAlerts from '../../middleware/alerts';
import generateRedirectToShow from '../../middleware/redirectToShow';
import { injectMiddleware } from '../../middleware/utils';
import {
  exists,
  valueOrDefault,
} from '../../../utils/object';
import { capitalize } from '../../../utils/string';

const generateNamespace = (options) => {
  if (exists(options.namespace)) { return options.namespace; }

  const { resourceName } = options;

  return `${pluralize(resourceName)}/create${capitalize(resourceName)}Form`;
};

const generateUrl = (options) => {
  const { namespace } = options;

  if (exists(options.url)) { return options.url; }

  return `/api/${namespace.replace(/\/\w+$/, '')}`;
};

const createFormEndpoint = (options) => {
  const { resourceName } = options;
  const data = valueOrDefault(options.data, {});
  const namespace = generateNamespace(options);
  const url = generateUrl({ ...options, namespace });

  const alerts = generateAlerts({
    action: 'create',
    resourceName,
    pending: true,
    failure: true,
    success: true,
  });
  const redirect = generateRedirectToShow({
    baseUrl: `/${namespace.replace(/\/\w+$/, '')}`,
    resourceName,
    on: 'success',
  });
  const middleware = injectMiddleware(
    [
      authorization,
      alerts,
      redirect,
    ],
    valueOrDefault(options.middleware, []),
  );

  const endpoint = new FormEndpoint({
    data,
    middleware,
    namespace,
    url,
  });

  endpoint.middleware = middleware;
  endpoint.options = options;
  endpoint.type = 'api/resources/createForm';

  return endpoint;
};

export default createFormEndpoint;
