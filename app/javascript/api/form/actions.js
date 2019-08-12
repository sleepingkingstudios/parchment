import { convertToArray } from '../../utils/array';

const generateActions = ({ namespace }) => {
  const REQUEST_FAILURE = `${namespace}/requestFailure`;
  const REQUEST_PENDING = `${namespace}/requestPending`;
  const REQUEST_SUCCESS = `${namespace}/requestSuccess`;
  const SET_DATA = `${namespace}/setData`;
  const UPDATE_FORM_FIELD = `${namespace}/updateFormField`;

  const requestFailure = errors => ({
    type: REQUEST_FAILURE,
    payload: { errors },
  });

  const requestPending = () => ({
    type: REQUEST_PENDING,
    payload: {},
  });

  const requestSuccess = data => ({
    type: REQUEST_SUCCESS,
    payload: { data },
  });

  const setData = data => ({
    type: SET_DATA,
    payload: { data },
  });

  const updateFormField = ({ path, propName, value }) => ({
    type: UPDATE_FORM_FIELD,
    payload: { path: convertToArray(path), propName, value },
  });

  return {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    SET_DATA,
    UPDATE_FORM_FIELD,
    requestFailure,
    requestPending,
    requestSuccess,
    setData,
    updateFormField,
  };
};

export default generateActions;
