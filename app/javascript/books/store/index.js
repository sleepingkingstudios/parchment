import { combineReducers } from 'redux';

import { reducer as createBookForm } from './createBookForm';
import { reducer as deleteBook } from './deleteBook';
import { reducer as indexFindBooks } from './indexFindBooks';
import { reducer as showFindBook } from './showFindBook';
import { reducer as updateBookForm } from './updateBookForm';
import { reducer as updateFindBook } from './updateFindBook';

export default combineReducers({
  createBookForm,
  deleteBook,
  indexFindBooks,
  showFindBook,
  updateBookForm,
  updateFindBook,
});
