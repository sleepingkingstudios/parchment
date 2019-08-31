import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import generateEndpointHooks from '../endpoint/hooks';

const generateHooks = ({ performRequest, selector }) => {
  const useRequestData = params => () => {
    const dispatch = useDispatch();
    const { getState } = useStore();

    useEffect(() => { performRequest(params)(dispatch, getState); }, []);
  };

  return Object.assign(
    generateEndpointHooks({ performRequest, selector }),
    { useRequestData },
  );
};

export default generateHooks;
