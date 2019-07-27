import initialState from './initialState';
import {
  REQUEST_FAILURE,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  UPDATE_FORM_FIELD,
} from './actions';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../../store/requestStatus';
import { buildSpell } from '../../entities';

const updateData = (state, { propName, value }) => {
  const data = Object.assign({}, state.data);

  data[propName] = value;

  return Object.assign({}, state, { data });
};

const createSpellReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FAILURE:
      /* eslint-disable-next-line no-console */
      console.log('createSpellReducer: REQUEST_FAILURE', action.payload);
      return Object.assign({}, state, {
        errors: action.payload.errors,
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
        data: buildSpell(),
        errors: {},
        requestStatus: SUCCESS,
      });
    case UPDATE_FORM_FIELD:
      /* eslint-disable-next-line no-console */
      console.log('createSpellReducer: UPDATE_FORM_FIELD', action.payload);
      return updateData(state, action.payload);
    default:
      return state;
  }
};

export default createSpellReducer;
