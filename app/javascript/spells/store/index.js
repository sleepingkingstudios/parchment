import { combineReducers } from 'redux';

import { reducer as create } from '../pages/create-page';
import { reducer as index } from '../pages/index-page';
import { reducer as show } from '../pages/show-page';
import { reducer as update } from '../pages/update-page';

export default combineReducers({
  create,
  index,
  show,
  update,
});
