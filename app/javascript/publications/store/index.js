import { combineReducers } from 'redux';

import { reducer as createPublicationForm } from './createPublicationForm';
import { reducer as indexFindPublications } from './indexFindPublications';
import { reducer as showFindPublication } from './showFindPublication';
import { reducer as updatePublicationForm } from './updatePublicationForm';

export default combineReducers({
  createPublicationForm,
  indexFindPublications,
  showFindPublication,
  updatePublicationForm,
});
