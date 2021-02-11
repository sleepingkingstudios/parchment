import pluralize from 'pluralize';

import { valueOrDefault } from 'utils/object';
import generateReducer from './reducer';
import generateRoutes from './routes';
import normalizeResources from './normalize';

const buildResource = (options) => {
  const { resourceName } = options;
  const baseUrl = valueOrDefault(
    options.baseUrl,
    `/${resourceName}`,
  );
  const namespace = valueOrDefault(
    options.namespace,
    resourceName,
  );
  const singularResourceName = valueOrDefault(
    options.singularResourceName,
    pluralize.singular(resourceName),
  );
  const resources = normalizeResources({
    ...options,
    baseUrl,
    namespace,
    singularResourceName,
  });

  const Routes = generateRoutes(resources);
  const reducer = generateReducer(resources);

  return {
    Routes,
    options,
    reducer,
    type: 'resource',
  };
};

export default buildResource;
