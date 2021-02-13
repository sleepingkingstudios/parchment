import buildApiClient from 'api/client';
import generateAlerts from 'api/middleware/alerts';
import authorization from 'api/middleware/authorization';
import generateRedirectToShow from 'api/middleware/redirectToShow';
import { valueOrDefault } from 'utils/object';

const generateMiddleware = (options) => {
  const {
    baseUrl,
    middleware,
    resourceName,
    singularResourceName,
  } = options;
  const alerts = generateAlerts({
    action: 'create',
    resourceName: singularResourceName,
    pending: true,
    failure: true,
    success: true,
  });
  const redirect = generateRedirectToShow({
    baseUrl,
    resourceName,
    singularResourceName,
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
    requestData,
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
    method: 'POST',
    middleware,
    namespace,
    requestData,
    url,
  });

  return Object.assign(
    client,
    {
      options,
      type: 'resource/create-page/submit',
    },
  );
};

export default buildClient;
