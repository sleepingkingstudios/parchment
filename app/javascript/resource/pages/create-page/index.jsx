import pluralize from 'pluralize';

import { valueOrDefault } from 'utils/object';
import { injectProps } from 'utils/react';
import CreatePage from './page';
import buildStore from './store';

const buildCreatePage = (options) => {
  const { resourceName } = options;
  const singularResourceName = valueOrDefault(
    options.singularResourceName,
    pluralize.singular(resourceName),
  );
  const store = buildStore({
    ...options,
    resourceName,
    singularResourceName,
  });
  const {
    hooks,
    reducer,
  } = store;

  const Page = injectProps(
    CreatePage,
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
    type: 'resource/pages/createPage',
  };
};

export default buildCreatePage;
