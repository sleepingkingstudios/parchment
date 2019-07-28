const generateActions = ({ namespace }) => {
  const REQUEST_FAILURE = `${namespace}/requestFailure`;
  const REQUEST_PENDING = `${namespace}/requestPending`;
  const REQUEST_SUCCESS = `${namespace}/requestSuccess`;
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

  const updateFormField = ({ propName, value }) => ({
    type: UPDATE_FORM_FIELD,
    payload: { propName, value },
  });

  return {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    UPDATE_FORM_FIELD,
    requestFailure,
    requestPending,
    requestSuccess,
    updateFormField,
  };
};

export default generateActions;
