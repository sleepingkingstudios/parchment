import { useDispatch, useStore } from 'react-redux';

const generateHooks = ({ performRequest }) => {
  const useDeleteData = (params) => {
    const dispatch = useDispatch();
    const { getState } = useStore();

    return () => { performRequest(params)(dispatch, getState); };
  };

  return { useDeleteData };
};

export default generateHooks;
