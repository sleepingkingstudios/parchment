import initialState from './initialState';
import {
  REQUEST_FAILURE,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
} from './actions';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../../store/requestStatus';

const createSpellReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FAILURE:
      /* eslint-disable-next-line no-console */
      console.log('createSpellReducer: REQUEST_FAILURE', action.payload);
      return Object.assign({}, state, {
        requestStatus: FAILURE,
      });
    case REQUEST_PENDING:
      /* eslint-disable-next-line no-console */
      console.log('createSpellReducer: REQUEST_PENDING');
      return Object.assign({}, state, {
        requestStatus: PENDING,
      });
    case REQUEST_SUCCESS:
      /* eslint-disable-next-line no-console */
      console.log('createSpellReducer: REQUEST_SUCCESS', action.payload);
      return Object.assign({}, state, {
        requestStatus: SUCCESS,
      });
    default:
      return state;
  }
};

export default createSpellReducer;
