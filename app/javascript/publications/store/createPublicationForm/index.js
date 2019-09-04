import FormEndpoint from '../../../api/form';
import { buildPublication } from '../../entities';
import alerts from './alerts';
import redirect from './redirect';

const REQUEST_URL = '/api/publications';
const endpoint = new FormEndpoint({
  data: { publication: buildPublication() },
  middleware: [
    redirect,
    alerts,
  ],
  namespace: 'publications/createPublicationForm',
  url: REQUEST_URL,
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
