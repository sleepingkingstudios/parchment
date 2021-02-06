import pluralize from 'pluralize';

import generateRedirectToIndex from 'api/middleware/redirectToIndex';
import buildFindClient from 'resource/store/find';
import { valueOrDefault } from 'utils/object';
import { underscore } from 'utils/string';

const buildClient = (options) => {
  const { resourceName } = options;
  const baseUrl = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    options.baseUrl,
    `/${pluralize(underscore(resourceName)).replace(/_/g, '-')}`,
  );
  const redirect = generateRedirectToIndex({
    baseUrl,
    resourceName,
    on: 'failure',
  });
  const middleware = [
    redirect,
    ...valueOrDefault(options.middleware, []),
  ];
  const client = buildFindClient({ ...options, middleware });

  return Object.assign(
    client,
    {
      options,
      type: 'resource/show-page/find',
    },
  );
};

export default buildClient;
