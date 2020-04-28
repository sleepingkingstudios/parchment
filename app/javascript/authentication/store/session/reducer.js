import {
  CLEAR_TOKEN,
  SET_TOKEN,
} from './actions';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_TOKEN:
      return Object.assign({}, state, { token: '' });
    case SET_TOKEN:
      return Object.assign({}, state, { token: action.payload.token });
    default:
      return state;
  }
};

export default reducer;
