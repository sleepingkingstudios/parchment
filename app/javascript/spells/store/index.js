import { combineReducers } from 'redux';

import { reducer as indexFindSpells } from './indexFindSpells';
import { reducer as showFindSpell } from './showFindSpell';

export default combineReducers({
  indexFindSpells,
  showFindSpell,
});
