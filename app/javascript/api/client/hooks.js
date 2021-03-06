import { useEffect } from 'react';
import {
  shallowEqual,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';

import { dig } from 'utils/object';

const generateHooks = ({ namespace, performRequest }) => {
  const usePerformRequest = (outer, skip = []) => (inner) => {
    const dispatch = useDispatch();
    const { getState } = useStore();
    const params = Object.assign(
      {},
      outer,
      inner,
    );

    useEffect(
      () => { performRequest(params)(dispatch, getState); },
      skip,
    );
  };

  const useRequest = (params) => {
    const dispatch = useDispatch();
    const { getState } = useStore();

    return () => { performRequest(params)(dispatch, getState); };
  };

  const useStatus = () => useSelector(
    state => dig(state, ...namespace.split('/'), 'status'),
    shallowEqual,
  );

  return {
    usePerformRequest,
    useRequest,
    useStatus,
  };
};

export default generateHooks;
