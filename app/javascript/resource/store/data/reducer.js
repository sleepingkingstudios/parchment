import { valueOrDefault } from 'utils/object';

const defaultData = (resourceName) => {
  const data = {};

  data[resourceName] = [];

  return data;
};

const generateReducer = (options) => {
  const {
    actions,
    resourceName,
  } = options;
  const data = valueOrDefault(options.data, defaultData(resourceName));
  const { REQUEST_SUCCESS } = actions;

  return (state = { data }, action) => {
    switch (action.type) {
      case REQUEST_SUCCESS:
        return Object.assign({}, state, { data: action.payload.data });
      default:
        return state;
    }
  };
};

export default generateReducer;
