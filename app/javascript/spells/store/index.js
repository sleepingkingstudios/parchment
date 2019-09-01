import { combineReducers } from 'redux';

import { reducer as createSpellForm } from './createSpellForm';
import { reducer as deleteSpell } from './deleteSpell';
import { reducer as indexFindSpells } from './indexFindSpells';
import { reducer as showFindSpell } from './showFindSpell';
import { reducer as updateFindSpell } from './updateFindSpell';
import { reducer as updateSpellForm } from './updateSpellForm';

export default combineReducers({
  createSpellForm,
  deleteSpell,
  indexFindSpells,
  showFindSpell,
  updateFindSpell,
  updateSpellForm,
});
