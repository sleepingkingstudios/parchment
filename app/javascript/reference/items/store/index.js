import { combineReducers } from 'redux';

import { reducer as createItemForm } from './createItemForm';
import { reducer as indexFindItems } from './indexFindItems';
import { reducer as showFindItem } from './showFindItem';
import { reducer as updateFindItem } from './updateFindItem';
import { reducer as updateItemForm } from './updateItemForm';

export default combineReducers({
  createItemForm,
  indexFindItems,
  showFindItem,
  updateFindItem,
  updateItemForm,
});
