const generateReducer = ({ actions, initialState }) => {
  const { REQUEST_SUCCESS } = actions;

  return (state = { data: initialState }, action) => {
    switch (action.type) {
      case REQUEST_SUCCESS:
        return Object.assign({}, state, { data: action.payload.data });
      default:
        return state;
    }
  };
};

export default generateReducer;
