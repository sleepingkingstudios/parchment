import { combineReducers } from 'redux';

import { reducer as createSpellForm } from './createSpellForm';
import { reducer as indexFindSpells } from './indexFindSpells';
import { reducer as showFindSpell } from './showFindSpell';

export default combineReducers({
  createSpellForm,
  indexFindSpells,
  showFindSpell,
});
