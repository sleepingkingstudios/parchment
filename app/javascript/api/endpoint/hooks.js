import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const generateHooks = ({ performRequest, selector }) => {
  const useEndpoint = (fn = state => state) => useSelector(
    state => fn(selector(state)),
    shallowEqual,
  );

  const usePerformRequest = params => () => {
    const dispatch = useDispatch();

    useEffect(() => { performRequest(params)(dispatch); });
  };

  return {
    useEndpoint,
    usePerformRequest,
  };
};

export default generateHooks;
