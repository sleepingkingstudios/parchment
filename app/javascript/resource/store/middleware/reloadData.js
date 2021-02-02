const reloadData = (options) => {
  const { performRequest } = options;
  const type = 'resource/store/middleware/reloadData';
  const handleSuccess = next => ({ dispatch, getState, response }) => {
    performRequest()(dispatch, getState);

    return next({ dispatch, getState, response });
  };

  return {
    handleSuccess,
    options,
    type,
  };
};

export default reloadData;
