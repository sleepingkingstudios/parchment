import { injectProps } from 'utils/react';
import IndexPage from './page';
import buildStore from './store';

const buildIndexPage = (options) => {
  const store = buildStore(options);
  const {
    hooks,
    reducer,
  } = store;

  const Page = injectProps(
    IndexPage,
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
    type: 'resource/pages/index-page',
  };
};

export default buildIndexPage;
