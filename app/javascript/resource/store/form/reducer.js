import pluralize from 'pluralize';

import {
  assign,
  dig,
  exists,
  valueOrDefault,
} from 'utils/object';

const defaultData = (resourceName) => {
  const data = {};
  const isSingular = pluralize.singular(resourceName) === resourceName;

  data[resourceName] = isSingular ? {} : [];

  return data;
};

const updateData = (state, { data, path }) => {
  const currentData = dig(state.data, ...path);
  const mergedData = Object.assign({}, currentData, data);
  const nestedData = assign(state, mergedData, 'data', ...path);

  return Object.assign({}, state, nestedData);
};

const generateReducer = (options) => {
  const {
    actions,
    findActions,
    singularResourceName,
    submitActions,
  } = options;
  const data = valueOrDefault(options.data, defaultData(singularResourceName));
  const errors = valueOrDefault(options.errors, {});
  const {
    UPDATE_FORM_DATA,
  } = actions;
  const initialState = { data, errors };
  const { REQUEST_FAILURE } = submitActions;

  if (exists(findActions)) {
    const { REQUEST_SUCCESS } = findActions;

    return (
      (state = initialState, action) => {
        switch (action.type) {
          case REQUEST_SUCCESS:
            return Object.assign({}, state, { data: action.payload.data });
          case REQUEST_FAILURE:
            return Object.assign({}, state, { errors: action.payload.errors });
          case UPDATE_FORM_DATA:
            return updateData(state, action.payload);
          default:
            return state;
        }
      }
    );
  }

  return (
    (state = initialState, action) => {
      switch (action.type) {
        case REQUEST_FAILURE:
          return Object.assign({}, state, { errors: action.payload.errors });
        case UPDATE_FORM_DATA:
          return updateData(state, action.payload);
        default:
          return state;
      }
    }
  );
};

export default generateReducer;
