import { combineReducers } from 'redux';

import { reducer as findSpells } from './findSpells/index';

export default combineReducers({
  findSpells,
});
