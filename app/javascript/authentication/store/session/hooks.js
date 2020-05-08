import {
  shallowEqual,
  useDispatch,
  useSelector,
} from 'react-redux';

import { clearSession } from './actions';
import selector from './selector';

export const useClearSession = () => {
  const dispatch = useDispatch();

  return () => dispatch(clearSession());
};

export const useSession = (fn = state => state) => useSelector(
  state => fn(selector(state)),
  shallowEqual,
);

const hooks = {
  useClearSession,
  useSession,
};

export default hooks;
