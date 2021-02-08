import { injectProps } from 'utils/react';
import CreatePage from './page';
import buildStore from './store';

const buildCreatePage = (options) => {
  const store = buildStore(options);
  const {
    hooks,
    reducer,
  } = store;

  const Page = injectProps(
    CreatePage,
    Object.assign(
      {},
      { hooks },
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
