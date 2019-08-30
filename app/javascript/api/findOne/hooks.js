import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import generateEndpointHooks from '../endpoint/hooks';

const generateHooks = ({ performRequest, selector }) => {
  const useRequestData = params => () => {
    const dispatch = useDispatch();

    useEffect(() => { performRequest(params)(dispatch); });
  };

  return Object.assign(
    generateEndpointHooks({ performRequest, selector }),
    { useRequestData },
  );
};

export default generateHooks;
