const reloadData = ({ performRequest }) => {
  const type = 'api/reloadData';
  const handleSuccess = next => ({ dispatch, getState, response }) => {
    performRequest()(dispatch, getState);

    return next({ dispatch, getState, response });
  };

  return {
    handleSuccess,
    type,
  };
};

export default reloadData;
