import { combineReducers } from 'redux';

import { reducer as createBookForm } from './createBookForm';
import { reducer as indexFindBooks } from './indexFindBooks';
import { reducer as showFindBook } from './showFindBook';

export default combineReducers({
  createBookForm,
  indexFindBooks,
  showFindBook,
});
