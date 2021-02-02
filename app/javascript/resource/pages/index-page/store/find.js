import buildApiClient from 'api/client';
import generateAlerts from 'api/middleware/alerts';
import authorization from 'api/middleware/authorization';
import { valueOrDefault } from 'utils/object';

const generateMiddleware = ({ middleware, resourceName }) => {
  const alerts = generateAlerts({
    action: 'find',
    resourceName,
    failure: true,
  });

  return [authorization, alerts, ...middleware];
};

const buildClient = (options) => {
  const {
    namespace,
    resourceName,
    url,
  } = options;
  const middleware = generateMiddleware({
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
      type: 'resource/index-page/find',
    },
  );
};

export default buildClient;
