import FormEndpoint from '../../../api/form';
import { buildPublication } from '../../entities';
import alerts from './alerts';
import redirect from './redirect';

const namespace = 'publications/updatePublicationForm';
const REQUEST_URL = '/api/publications/:id';

export const {
  actions,
  hooks,
  reducer,
  request,
} = new FormEndpoint({
  data: { publication: buildPublication() },
  method: 'PATCH',
  middleware: [
    redirect,
    alerts,
  ],
  namespace,
  url: REQUEST_URL,
});
