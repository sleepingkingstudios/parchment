import { shallowEqual, useSelector } from 'react-redux';

import selector from './selector';

export const useSession = (fn = state => state) => useSelector(
  state => fn(selector(state)),
  shallowEqual,
);

const hooks = {
  useSession,
};

export default hooks;
