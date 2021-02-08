import { convertToArray } from 'utils/array';

const generateActions = ({ namespace }) => {
  const UPDATE_FORM_DATA = `${namespace}/updateFormData`;

  const updateFormData = ({ data, path }) => ({
    type: UPDATE_FORM_DATA,
    payload: { data, path: convertToArray(path) },
  });

  return Object.assign(
    {
      UPDATE_FORM_DATA,
      updateFormData,
    },
  );
};

export default generateActions;
