import { combineReducers } from 'redux';

import { reducer as indexFindActions } from './indexFindActions';
import { reducer as showFindAction } from './showFindAction';

export default combineReducers({
  indexFindActions,
  showFindAction,
});
