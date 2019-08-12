import endpointActions from '../endpoint/actions';
import { convertToArray } from '../../utils/array';

const generateActions = ({ namespace }) => {
  const SET_DATA = `${namespace}/setData`;
  const UPDATE_FORM_FIELD = `${namespace}/updateFormField`;

  const setData = data => ({
    type: SET_DATA,
    payload: { data },
  });

  const updateFormField = ({ path, propName, value }) => ({
    type: UPDATE_FORM_FIELD,
    payload: { path: convertToArray(path), propName, value },
  });

  return Object.assign(
    endpointActions({ namespace }),
    {
      SET_DATA,
      UPDATE_FORM_FIELD,
      setData,
      updateFormField,
    },
  );
};

export default generateActions;
