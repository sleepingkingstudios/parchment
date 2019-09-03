import { combineReducers } from 'redux';

import { reducer as createPublicationForm } from './createPublicationForm';
import { reducer as indexFindPublications } from './indexFindPublications';

export default combineReducers({
  createPublicationForm,
  indexFindPublications,
});
