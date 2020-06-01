import { combineReducers } from 'redux';

import { reducer as deleteCondition } from './deleteCondition';
import { reducer as indexFindConditions } from './indexFindConditions';
import { reducer as showFindCondition } from './showFindCondition';

export default combineReducers({
  deleteCondition,
  indexFindConditions,
  showFindCondition,
});
