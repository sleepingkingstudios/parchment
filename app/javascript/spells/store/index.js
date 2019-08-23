import { combineReducers } from 'redux';

import { reducer as findSpells } from './findSpells/index';
import { reducer as showFindSpell } from './showFindSpell';

export default combineReducers({
  findSpells,
  showFindSpell,
});
