import {
  dig,
  isEmpty,
  exists,
  valueOrDefault,
} from 'utils/object';
import buildCreatePage from './pages/create-page';
import buildIndexPage from './pages/index-page';
import buildShowPage from './pages/show-page';
import buildUpdatePage from './pages/update-page';

const compactEntries = entries => entries.reduce(
  (ary, tuple) => {
    const [, resource] = tuple;

    if (exists(resource)) { ary.push(tuple); }

    return ary;
  },
  [],
);
const removeResources = (options) => {
  const opts = Object.assign({}, options);

  delete opts.resources;

  return opts;
};

const defaultResources = {
  create: true,
  index: true,
  show: true,
  update: true,
};
const resourceDefaults = {
  create: {
    build: buildCreatePage,
    exact: true,
    path: '/create',
  },
  index: {
    build: buildIndexPage,
    exact: true,
    path: '/',
  },
  show: {
    build: buildShowPage,
    exact: true,
    path: '/:id',
  },
  update: {
    build: buildUpdatePage,
    exact: true,
    path: '/:id/update',
  },
};
const generateDefault = (key, configuredOptions) => {
  const resourceDefault = resourceDefaults[key];

  if (!exists(resourceDefault)) {
    throw new Error(`No default resource defined for ${key}.`);
  }

  const resourceOptions = valueOrDefault(
    dig(configuredOptions, 'resources', key, 'options'),
    {},
  );

  const {
    build,
    exact,
    path,
  } = resourceDefault;
  const namespace = `${configuredOptions.namespace}/${key}`;
  const resource = build({
    ...configuredOptions,
    ...resourceOptions,
    namespace,
  });
  const {
    Page,
    reducer,
  } = resource;

  return {
    component: Page,
    exact,
    options: {},
    path,
    reducer,
  };
};
const applyDefaultsToResource = (key, raw, configuredOptions) => {
  if (raw === false) { return null; }

  if (raw === true) { return generateDefault(key, configuredOptions); }

  if (defaultResources[key]) {
    const customOptions = valueOrDefault(raw.options, {});
    const baseUrl = valueOrDefault(
      customOptions.baseUrl,
      configuredOptions.baseUrl,
    );
    const namespace = valueOrDefault(
      customOptions.namespace,
      configuredOptions.namespace,
    );
    const resourceName = valueOrDefault(
      customOptions.resourceName,
      configuredOptions.resourceName,
    );
    const singularResourceName = valueOrDefault(
      customOptions.resourceName,
      configuredOptions.singularResourceName,
    );
    const url = valueOrDefault(
      customOptions.url,
      configuredOptions.url,
    );

    return Object.assign(
      generateDefault(key, {
        ...configuredOptions,
        baseUrl,
        namespace,
        resourceName,
        singularResourceName,
        url,
      }),
      raw,
    );
  }

  return raw;
};

const normalizeResources = (options) => {
  const configuredResources = valueOrDefault(
    options.resources,
    {},
  );
  const resources = isEmpty(configuredResources)
    ? defaultResources
    : configuredResources;
  const entries = Object.entries(resources).map(
    (tuple) => {
      const [key, raw] = tuple;
      const resource = applyDefaultsToResource(key, raw, options);

      if (!exists(resource)) { return [key, null]; }

      const resourceWithOptions = Object.assign(
        {},
        resource,
        {
          options: Object.assign(
            {},
            removeResources(options),
            valueOrDefault(raw.options, {}),
          ),
        },
      );

      return [key, resourceWithOptions];
    },
  );

  return Object.fromEntries(compactEntries(entries));
};

export default normalizeResources;
