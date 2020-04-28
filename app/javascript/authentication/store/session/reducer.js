import {
  CLEAR_SESSION,
  SET_SESSION,
} from './actions';
import initialState from './initialState';
import { buildUser } from '../../entities';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SESSION:
      return Object.assign({}, state, { token: '', user: buildUser() });
    case SET_SESSION:
      return Object.assign({}, state, {
        token: action.payload.token,
        user: action.payload.user,
      });
    default:
      return state;
  }
};

export default reducer;
