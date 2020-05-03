import { combineReducers } from 'redux';

import { reducer as loginForm } from './loginForm';
import { reducer as session } from './session';
import observer from './observer';

export default combineReducers({
  loginForm,
  session,
});

export { observer };
