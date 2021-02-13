import pluralize from 'pluralize';

import { valueOrDefault } from 'utils/object';

const defaultData = (resourceName) => {
  const data = {};
  const isSingular = pluralize.singular(resourceName) === resourceName;

  data[resourceName] = isSingular ? {} : [];

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
