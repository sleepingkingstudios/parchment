import { combineReducers } from 'redux';

import { reducer as createSpellForm } from './createSpellForm';
import { reducer as deleteSpell } from './deleteSpell';
import { reducer as formFindOrigins } from './formFindOrigins';
import { reducer as updateFindSpell } from './updateFindSpell';
import { reducer as updateSpellForm } from './updateSpellForm';

import { reducer as index } from '../pages/index-page';
import { reducer as show } from '../pages/show-page';

export default combineReducers({
  createSpellForm,
  deleteSpell,
  formFindOrigins,
  index,
  show,
  updateFindSpell,
  updateSpellForm,
});
