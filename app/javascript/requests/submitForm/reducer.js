import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/requestStatus';

const updateData = (state, { propName, value }) => {
  const data = Object.assign({}, state.data);

  data[propName] = value;

  return Object.assign({}, state, { data });
};

const generateReducer = ({ actions, initialState }) => {
  const {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
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
        case UPDATE_FORM_FIELD:
          return updateData(state, action.payload);
        default:
          return state;
      }
    }
  );
};

export default generateReducer;
