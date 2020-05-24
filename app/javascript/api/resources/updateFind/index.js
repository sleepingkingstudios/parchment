import pluralize from 'pluralize';

import FindOneEndpoint from '../../findOne';
import authorization from '../../middleware/authorization';
import generateAlerts from '../../middleware/alerts';
import generateRedirectToIndex from '../../middleware/redirectToIndex';
import updateFormData from '../../middleware/updateFormData';
import { injectMiddleware } from '../../middleware/utils';
import {
  exists,
  valueOrDefault,
} from '../../../utils/object';
import { capitalize } from '../../../utils/string';

const generateNamespace = (options) => {
  if (exists(options.namespace)) { return options.namespace; }

  const { resourceName } = options;

  return `${pluralize(resourceName)}/updateFind${capitalize(resourceName)}`;
};

const generateUrl = (options) => {
  const { namespace } = options;

  if (exists(options.url)) { return options.url; }

  return `/api/${namespace.replace(/\/\w+$/, '')}/:id`;
};

const updateFindEndpoint = (options) => {
  const { formEndpoint, mapData, resourceName } = options;
  const data = valueOrDefault(options.data, {});
  const namespace = generateNamespace(options);
  const url = generateUrl({ ...options, namespace });

  const alerts = generateAlerts({
    action: 'find',
    resourceName,
    failure: true,
  });
  const redirect = generateRedirectToIndex({
    baseUrl: `/${namespace.replace(/\/\w+$/, '')}`,
    resourceName,
    on: 'failure',
  });
  const updateData = updateFormData({ formEndpoint, mapData });
  const middleware = injectMiddleware(
    [
      authorization,
      alerts,
      redirect,
      updateData,
    ],
    valueOrDefault(options.middleware, []),
  );

  const endpoint = new FindOneEndpoint({
    data,
    middleware,
    namespace,
    url,
  });

  endpoint.middleware = middleware;
  endpoint.options = options;
  endpoint.type = 'api/resources/updateFind';

  return endpoint;
};

export default updateFindEndpoint;
