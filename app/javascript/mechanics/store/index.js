import { combineReducers } from 'redux';

import { reducer as actions } from '../actions';
import { reducer as conditions } from '../conditions';

export default combineReducers({
  actions,
  conditions,
});
