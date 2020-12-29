import { combineReducers } from 'redux';

import { reducer as items } from '../items';
import { reducer as languages } from '../languages';
import { reducer as skills } from '../skills';

export default combineReducers({
  items,
  languages,
  skills,
});
