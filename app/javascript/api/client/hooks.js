import { useEffect } from 'react';
import {
  shallowEqual,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';

import { dig } from 'utils/object';

const generateHooks = ({ namespace, performRequest }) => {
  const usePerformRequest = (params, skip = []) => () => {
    const dispatch = useDispatch();
    const { getState } = useStore();

    useEffect(
      () => { performRequest(params)(dispatch, getState); },
      skip,
    );
  };

  const selector = state => dig(state, ...namespace.split('/'), 'status');

  const useStatus = () => useSelector(
    state => selector(state),
    shallowEqual,
  );

  return {
    usePerformRequest,
    useStatus,
  };
};

export default generateHooks;
