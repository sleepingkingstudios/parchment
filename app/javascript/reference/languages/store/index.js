import { combineReducers } from 'redux';

import { reducer as indexFindLanguages } from './indexFindLanguages';
import { reducer as showFindLanguage } from './showFindLanguage';

export default combineReducers({
  indexFindLanguages,
  showFindLanguage,
});
