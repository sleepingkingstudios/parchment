import generateRedirectToIndex from 'api/middleware/redirectToIndex';
import buildFindClient from 'resource/store/find';
import { valueOrDefault } from 'utils/object';
import { underscore } from 'utils/string';

const buildClient = (options) => {
  const {
    resourceName,
    singularResourceName,
  } = options;
  const baseUrl = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    options.baseUrl,
    `/${underscore(resourceName).replace(/_/g, '-')}`,
  );
  const redirect = generateRedirectToIndex({
    baseUrl,
    resourceName,
    singularResourceName,
    on: 'failure',
  });
  const middleware = [
    redirect,
    ...valueOrDefault(options.middleware, []),
  ];
  const client = buildFindClient({
    ...options,
    middleware,
    resourceName: singularResourceName,
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
