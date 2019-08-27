import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import generateEndpointHooks from '../endpoint/hooks';

const generateHooks = ({ actions, performRequest, selector }) => {
  const useSubmitForm = (params) => {
    const dispatch = useDispatch();
    const identity = state => state;
    const state = useSelector(identity, shallowEqual);
    const getState = () => state;

    return () => { performRequest(params)(dispatch, getState); };
  };

  const useUpdateForm = () => {
    const dispatch = useDispatch();
    const { updateFormField } = actions;

    return (obj) => { dispatch(updateFormField(obj)); };
  };

  return Object.assign(
    generateEndpointHooks({ selector }),
    {
      useSubmitForm,
      useUpdateForm,
    },
  );
};

export default generateHooks;
