import { combineReducers } from 'redux';

import { reducer as createSpellForm } from './createSpellForm';
import { reducer as deleteSpell } from './deleteSpell';
import { reducer as formFindOrigins } from './formFindOrigins';
import { reducer as showFindSpell } from './showFindSpell';
import { reducer as updateFindSpell } from './updateFindSpell';
import { reducer as updateSpellForm } from './updateSpellForm';

import { reducer as index } from '../pages/index-page';

export default combineReducers({
  createSpellForm,
  deleteSpell,
  formFindOrigins,
  index,
  showFindSpell,
  updateFindSpell,
  updateSpellForm,
});
