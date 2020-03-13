import { combineReducers } from 'redux';

import { reducer as createActionForm } from './createActionForm';
import { reducer as indexFindActions } from './indexFindActions';
import { reducer as showFindAction } from './showFindAction';

export default combineReducers({
  createActionForm,
  indexFindActions,
  showFindAction,
});
