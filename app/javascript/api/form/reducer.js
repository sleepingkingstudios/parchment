import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../status';
import {
  assign,
  dig,
} from '../../utils/object';

const updateData = (state, { data, path }) => {
  const currentData = dig(state.data, ...path);
  const mergedData = Object.assign({}, currentData, data);
  const nestedData = assign(state, mergedData, 'data', ...path);

  return Object.assign({}, state, nestedData);
};

const updateField = (state, { path, propName, value }) => Object.assign({}, state, {
  data: assign(state.data, value, ...path, propName),
});

const generateReducer = ({ actions, initialState }) => {
  const {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    SET_FORM_DATA,
    UPDATE_FORM_DATA,
    UPDATE_FORM_FIELD,
  } = actions;

  return (
    (state = initialState, action) => {
      switch (action.type) {
        case REQUEST_FAILURE:
          return Object.assign({}, state, {
            errors: action.payload.errors,
            status: FAILURE,
          });
        case REQUEST_PENDING:
          return Object.assign({}, state, {
            status: PENDING,
          });
        case REQUEST_SUCCESS:
          return Object.assign({}, state, {
            data: initialState.data,
            errors: {},
            status: SUCCESS,
          });
        case SET_FORM_DATA:
          return Object.assign({}, state, {
            data: action.payload.data,
          });
        case UPDATE_FORM_DATA:
          return updateData(state, action.payload);
        case UPDATE_FORM_FIELD:
          return updateField(state, action.payload);
        default:
          return state;
      }
    }
  );
};

export default generateReducer;
