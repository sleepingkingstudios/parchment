import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/requestStatus';
import { deepAssignProperty } from '../../utils/object';

const updateData = (state, { path, propName, value }) => {
  const { data } = state;

  return Object.assign({}, state, {
    data: deepAssignProperty(data, propName, value, path),
  });
};

const generateReducer = ({ actions, initialState }) => {
  const {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    SET_DATA,
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
        case SET_DATA:
          return Object.assign({}, state, {
            data: action.payload.data,
          });
        case UPDATE_FORM_FIELD:
          return updateData(state, action.payload);
        default:
          return state;
      }
    }
  );
};

export default generateReducer;
