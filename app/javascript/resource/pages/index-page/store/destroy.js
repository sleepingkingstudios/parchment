import pluralize from 'pluralize';

import buildApiClient from 'api/client';
import generateAlerts from 'api/middleware/alerts';
import authorization from 'api/middleware/authorization';
import { valueOrDefault } from 'utils/object';
import reloadData from '../../../store/middleware/reloadData';

const generateMiddleware = ({ middleware, performRequest, resourceName }) => {
  const alerts = generateAlerts({
    action: 'delete',
    resourceName,
    pending: true,
    failure: true,
    success: { alertStyle: 'danger' },
  });

  return [
    authorization,
    alerts,
    reloadData({ performRequest }),
    ...middleware,
  ];
};

const buildClient = (options) => {
  const {
    findRequest,
    namespace,
    url,
  } = options;
  const resourceName = pluralize.singular(options.resourceName);
  const middleware = generateMiddleware({
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
      type: 'resource/index-page/destroy',
    },
  );
};

export default buildClient;
