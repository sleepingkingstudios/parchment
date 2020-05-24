import pluralize from 'pluralize';

import FindManyEndpoint from '../../findMany';
import authorization from '../../middleware/authorization';
import generateAlerts from '../../middleware/alerts';
import { injectMiddleware } from '../../middleware/utils';
import {
  exists,
  valueOrDefault,
} from '../../../utils/object';
import { capitalize } from '../../../utils/string';

const generateNamespace = (options) => {
  if (exists(options.namespace)) { return options.namespace; }

  const { resourceName } = options;

  return `${pluralize(resourceName)}/indexFind${pluralize(capitalize(resourceName))}`;
};

const generateUrl = (options) => {
  const { namespace } = options;

  if (exists(options.url)) { return options.url; }

  return `/api/${namespace.replace(/\/\w+$/, '')}`;
};

const indexEndpoint = (options) => {
  const { resourceName } = options;
  const data = valueOrDefault(options.data, {});
  const namespace = generateNamespace(options);
  const url = generateUrl({ ...options, namespace });

  const alerts = generateAlerts({
    action: 'find',
    resourceName: pluralize(resourceName),
    failure: true,
  });
  const middleware = injectMiddleware(
    [
      authorization,
      alerts,
    ],
    valueOrDefault(options.middleware, []),
  );

  const endpoint = new FindManyEndpoint({
    data,
    middleware,
    namespace,
    url,
  });

  endpoint.middleware = middleware;
  endpoint.options = options;
  endpoint.type = 'api/resources/index';

  return endpoint;
};

export default indexEndpoint;
