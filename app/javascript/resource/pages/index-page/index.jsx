import pluralize from 'pluralize';

import { valueOrDefault } from 'utils/object';
import { injectProps } from 'utils/react';
import IndexPage from './page';
import buildStore from './store';

const buildIndexPage = (options) => {
  const { resourceName } = options;
  const singularResourceName = valueOrDefault(
    options.singularResourceName,
    pluralize.singular(resourceName),
  );
  const store = buildStore({
    ...options,
    singularResourceName,
  });
  const {
    hooks,
    reducer,
  } = store;

  const Page = injectProps(
    IndexPage,
    Object.assign(
      {},
      {
        hooks,
        singularResourceName,
      },
      options,
    ),
  );

  return {
    Page,
    options,
    reducer,
    type: 'resource/pages/indexPage',
  };
};

export default buildIndexPage;
