import pluralize from 'pluralize';

import { valueOrDefault } from 'utils/object';
import { underscore } from 'utils/string';
import { injectProps } from 'utils/react';
import ShowPage from './page';
import buildStore from './store';

const buildShowPage = (options) => {
  const { resourceName } = options;
  const baseUrl = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    options.baseUrl,
    `/${pluralize(underscore(resourceName)).replace(/_/g, '-')}`,
  );

  const store = buildStore({ ...options, baseUrl });
  const {
    hooks,
    reducer,
  } = store;

  const Page = injectProps(
    ShowPage,
    Object.assign(
      {},
      {
        baseUrl,
        hooks,
      },
      options,
    ),
  );

  return {
    Page,
    options,
    reducer,
    type: 'resource/pages/showPage',
  };
};

export default buildShowPage;
