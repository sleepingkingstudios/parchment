import { combineReducers } from 'redux';

import { reducer as createConditionForm } from './createConditionForm';
import { reducer as deleteCondition } from './deleteCondition';
import { reducer as indexFindConditions } from './indexFindConditions';
import { reducer as showFindCondition } from './showFindCondition';
import { reducer as updateFindCondition } from './updateFindCondition';
import { reducer as updateConditionForm } from './updateConditionForm';

export default combineReducers({
  createConditionForm,
  deleteCondition,
  indexFindConditions,
  showFindCondition,
  updateConditionForm,
  updateFindCondition,
});
