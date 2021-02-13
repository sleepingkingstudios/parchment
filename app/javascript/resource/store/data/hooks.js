import { shallowEqual, useSelector } from 'react-redux';

import { dig } from 'utils/object';

const generateHooks = ({ namespace }) => {
  const selector = state => dig(state, ...namespace.split('/'), 'data');

  const useData = (fn = state => state) => useSelector(
    state => fn(selector(state)),
    shallowEqual,
  );

  return { useData };
};

export default generateHooks;
