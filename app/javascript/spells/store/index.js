import { combineReducers } from 'redux';

import { reducer as deleteSpell } from './deleteSpell';
import { reducer as updateFindSpell } from './updateFindSpell';
import { reducer as updateSpellForm } from './updateSpellForm';

import { reducer as create } from '../pages/create-page';
import { reducer as index } from '../pages/index-page';
import { reducer as show } from '../pages/show-page';

export default combineReducers({
  create,
  deleteSpell,
  index,
  show,
  updateFindSpell,
  updateSpellForm,
});
