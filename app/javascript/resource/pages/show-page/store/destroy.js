import buildApiClient from 'api/client';
import generateAlerts from 'api/middleware/alerts';
import authorization from 'api/middleware/authorization';
import generateRedirectToIndex from 'api/middleware/redirectToIndex';
import { valueOrDefault } from 'utils/object';

const generateMiddleware = (options) => {
  const {
    baseUrl,
    middleware,
    resourceName,
    singularResourceName,
  } = options;
  const alerts = generateAlerts({
    action: 'delete',
    resourceName: singularResourceName,
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
    namespace,
    resourceName,
    singularResourceName,
    url,
  } = options;
  const middleware = generateMiddleware({
    baseUrl,
    middleware: valueOrDefault(options.middleware, []),
    resourceName,
    singularResourceName,
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
