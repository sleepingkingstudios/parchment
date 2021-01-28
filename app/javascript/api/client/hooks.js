import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

const generateHooks = ({ performRequest }) => {
  const usePerformRequest = (params, skip = []) => () => {
    const dispatch = useDispatch();
    const { getState } = useStore();

    useEffect(
      () => { performRequest(params)(dispatch, getState); },
      skip,
    );
  };

  return { usePerformRequest };
};

export default generateHooks;
