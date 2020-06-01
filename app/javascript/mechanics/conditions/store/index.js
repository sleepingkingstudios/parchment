import { combineReducers } from 'redux';

import { reducer as deleteCondition } from './deleteCondition';
import { reducer as indexFindConditions } from './indexFindConditions';

export default combineReducers({
  deleteCondition,
  indexFindConditions,
});
