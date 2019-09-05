import { combineReducers } from 'redux';

import { reducer as createPublicationForm } from './createPublicationForm';
import { reducer as indexFindPublications } from './indexFindPublications';
import { reducer as showFindPublication } from './showFindPublication';

export default combineReducers({
  createPublicationForm,
  indexFindPublications,
  showFindPublication,
});
