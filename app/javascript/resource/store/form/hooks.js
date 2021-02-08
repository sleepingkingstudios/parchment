import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { dig } from 'utils/object';

const generateHooks = ({ actions, namespace }) => {
  const selector = state => dig(state, ...namespace.split('/'));

  const useForm = (fn = state => state) => useSelector(
    state => fn(selector(state)),
    shallowEqual,
  );

  const useUpdateForm = () => {
    const dispatch = useDispatch();
    const { updateFormData } = actions;

    return (obj) => { dispatch(updateFormData(obj)); };
  };

  return {
    useForm,
    useUpdateForm,
  };
};

export default generateHooks;
