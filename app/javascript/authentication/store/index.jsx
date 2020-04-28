import { combineReducers } from 'redux';

import { reducer as loginForm } from './loginForm';
import { reducer as session } from './session';

export default combineReducers({
  loginForm,
  session,
});
