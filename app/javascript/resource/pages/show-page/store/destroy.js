import pluralize from 'pluralize';

import buildApiClient from 'api/client';
import generateAlerts from 'api/middleware/alerts';
import authorization from 'api/middleware/authorization';
import generateRedirectToIndex from 'api/middleware/redirectToIndex';
import { valueOrDefault } from 'utils/object';

const generateMiddleware = ({
  baseUrl,
  middleware,
  resourceName,
}) => {
  const alerts = generateAlerts({
    action: 'delete',
    resourceName,
    pending: true,
    failure: true,
    success: { alertStyle: 'danger' },
  });
  const redirect = generateRedirectToIndex({
    baseUrl,
    resourceName,
    on: 'success',
  });

  return [
    authorization,
    alerts,
    redirect,
    ...middleware,
  ];
};

const buildClient = (options) => {
  const {
    baseUrl,
    findRequest,
    namespace,
    url,
  } = options;
  const resourceName = pluralize.singular(options.resourceName);
  const middleware = generateMiddleware({
    baseUrl,
    middleware: valueOrDefault(options.middleware, []),
    performRequest: findRequest,
    resourceName,
  });
  const client = buildApiClient({
    method: 'DELETE',
    middleware,
    namespace,
    url,
  });

  return Object.assign(
    client,
    {
      options,
      type: 'resource/show-page/destroy',
    },
  );
};

export default buildClient;
