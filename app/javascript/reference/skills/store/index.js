import { combineReducers } from 'redux';

import { reducer as indexFindSkills } from './indexFindSkills';
import { reducer as showFindSkill } from './showFindSkill';

export default combineReducers({
  indexFindSkills,
  showFindSkill,
});
