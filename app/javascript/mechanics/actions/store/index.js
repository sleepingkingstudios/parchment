import { combineReducers } from 'redux';

import { reducer as createActionForm } from './createActionForm';
import { reducer as indexFindActions } from './indexFindActions';
import { reducer as showFindAction } from './showFindAction';
import { reducer as updateActionForm } from './updateActionForm';
import { reducer as updateFindAction } from './updateFindAction';

export default combineReducers({
  createActionForm,
  indexFindActions,
  showFindAction,
  updateActionForm,
  updateFindAction,
});
