import { combineReducers } from 'redux';

import { reducer as indexFindItems } from './indexFindItems';
import { reducer as showFindItem } from './showFindItem';

export default combineReducers({
  indexFindItems,
  showFindItem,
});
