import pluralize from 'pluralize';

import DeleteOneEndpoint from '../../deleteOne';
import authorization from '../../middleware/authorization';
import generateAlerts from '../../middleware/alerts';
import generateRedirectToIndex from '../../middleware/redirectToIndex';
import { injectMiddleware } from '../../middleware/utils';
import {
  exists,
  valueOrDefault,
} from '../../../utils/object';
import { capitalize } from '../../../utils/string';

const generateNamespace = (options) => {
  if (exists(options.namespace)) { return options.namespace; }

  const { resourceName } = options;

  return `${pluralize(resourceName)}/delete${capitalize(resourceName)}`;
};

const generateUrl = (options) => {
  const { namespace } = options;

  if (exists(options.url)) { return options.url; }

  return `/api/${namespace.replace(/\/\w+$/, '')}/:id`;
};

const deleteEndpoint = (options) => {
  const { resourceName } = options;
  const namespace = generateNamespace(options);
  const url = generateUrl({ ...options, namespace });

  const alerts = generateAlerts({
    action: 'delete',
    resourceName,
    pending: true,
    failure: true,
    success: { alertStyle: 'danger' },
  });
  const redirect = generateRedirectToIndex({
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

  const endpoint = new DeleteOneEndpoint({
    middleware,
    namespace,
    url,
  });

  endpoint.middleware = middleware;
  endpoint.options = options;
  endpoint.type = 'api/resources/delete';

  return endpoint;
};

export default deleteEndpoint;
