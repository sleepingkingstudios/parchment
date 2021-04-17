import pluralize from 'pluralize';

import {
  exists,
  valueOrDefault,
} from 'utils/object';
import {
  kebabize,
  titleize,
} from 'utils/string';
import generateReducer from './reducer';
import generateRoutes from './routes';
import normalizeResources from './normalize';

const buildBreadcrumbs = (namespace) => {
  let segments;
  let relativePath = '';

  segments = namespace.split('/');
  segments = segments.slice(0, segments.length - 1);

  if (segments.length === 0) { return null; }

  return segments.reduce(
    (breadcrumbs, path) => {
      relativePath = `${relativePath}/${kebabize(path)}`;

      return [
        ...breadcrumbs,
        {
          label: titleize(path),
          url: relativePath,
        },
      ];
    },
    [
      {
        label: 'Home',
        url: '/',
      },
    ],
  );
};

const generateBaseUrl = namespace => (
  `/${namespace.split('/').map(kebabize).join('/')}`
);

const buildResource = (options) => {
  const { resourceName } = options;
  const breadcrumbs = valueOrDefault(
    options.breadcrumbs,
    exists(options.namespace) ? buildBreadcrumbs(options.namespace) : null,
  );
  const namespace = valueOrDefault(
    options.namespace,
    resourceName,
  );
  const baseUrl = valueOrDefault(
    options.baseUrl,
    generateBaseUrl(namespace),
  );
  const singularResourceName = valueOrDefault(
    options.singularResourceName,
    pluralize.singular(resourceName),
  );
  const resources = normalizeResources({
    ...options,
    baseUrl,
    breadcrumbs,
    namespace,
    singularResourceName,
  });
  // TODO: authorized = authorizeResources(normalized);

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
