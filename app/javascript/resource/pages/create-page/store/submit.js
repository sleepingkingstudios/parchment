import pluralize from 'pluralize';

import buildApiClient from 'api/client';
import generateAlerts from 'api/middleware/alerts';
import authorization from 'api/middleware/authorization';
import generateRedirectToShow from 'api/middleware/redirectToShow';
import { valueOrDefault } from 'utils/object';

const generateMiddleware = ({
  baseUrl,
  middleware,
  resourceName,
}) => {
  const alerts = generateAlerts({
    action: 'create',
    resourceName,
    pending: true,
    failure: true,
    success: true,
  });
  const redirect = generateRedirectToShow({
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
    requestData,
    url,
  } = options;
  const resourceName = pluralize.singular(options.resourceName);
  const middleware = generateMiddleware({
    baseUrl,
    middleware: valueOrDefault(options.middleware, []),
    resourceName,
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
