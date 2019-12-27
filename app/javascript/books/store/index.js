import { combineReducers } from 'redux';

import { reducer as indexFindBooks } from './indexFindBooks';
import { reducer as showFindBook } from './showFindBook';

export default combineReducers({
  indexFindBooks,
  showFindBook,
});
