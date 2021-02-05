import buildApiClient from 'api/client';
import generateAlerts from 'api/middleware/alerts';
import authorization from 'api/middleware/authorization';
import generateRedirectToIndex from 'api/middleware/redirectToIndex';
import { valueOrDefault } from 'utils/object';

const generateMiddleware = ({ baseUrl, middleware, resourceName }) => {
  const alerts = generateAlerts({
    action: 'find',
    resourceName,
    failure: true,
  });
  const redirect = generateRedirectToIndex({
    baseUrl,
    resourceName,
    on: 'failure',
  });

  return [authorization, alerts, redirect, ...middleware];
};

const buildClient = (options) => {
  const {
    baseUrl,
    namespace,
    resourceName,
    url,
  } = options;
  const middleware = generateMiddleware({
    baseUrl,
    middleware: valueOrDefault(options.middleware, []),
    resourceName,
  });
  const client = buildApiClient({
    middleware,
    namespace,
    url,
  });

  return Object.assign(
    client,
    {
      options,
      type: 'resource/show-page/find',
    },
  );
};

export default buildClient;
