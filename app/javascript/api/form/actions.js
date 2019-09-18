import endpointActions from '../endpoint/actions';
import { convertToArray } from '../../utils/array';

const generateActions = ({ namespace }) => {
  const SET_FORM_DATA = `${namespace}/setFormData`;
  const UPDATE_FORM_DATA = `${namespace}/updateFormData`;
  const UPDATE_FORM_FIELD = `${namespace}/updateFormField`;

  const setFormData = data => ({
    type: SET_FORM_DATA,
    payload: { data },
  });

  const updateFormData = ({ data, path }) => ({
    type: UPDATE_FORM_DATA,
    payload: { data, path: convertToArray(path) },
  });

  const updateFormField = ({ path, propName, value }) => ({
    type: UPDATE_FORM_FIELD,
    payload: { path: convertToArray(path), propName, value },
  });

  return Object.assign(
    endpointActions({ namespace }),
    {
      SET_FORM_DATA,
      UPDATE_FORM_DATA,
      UPDATE_FORM_FIELD,
      setFormData,
      updateFormData,
      updateFormField,
    },
  );
};

export default generateActions;
