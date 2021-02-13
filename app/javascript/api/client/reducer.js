import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../status';

const generateReducer = ({ actions, initialState }) => {
  const {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
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
            data: action.payload.data,
            errors: {},
            status: SUCCESS,
          });
        default:
          return state;
      }
    }
  );
};

export default generateReducer;
