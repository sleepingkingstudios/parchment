const generateActions = ({ namespace }) => {
  const REQUEST_FAILURE = `${namespace}/requestFailure`;
  const REQUEST_PENDING = `${namespace}/requestPending`;
  const REQUEST_SUCCESS = `${namespace}/requestSuccess`;

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

  return {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    requestFailure,
    requestPending,
    requestSuccess,
  };
};

export default generateActions;
