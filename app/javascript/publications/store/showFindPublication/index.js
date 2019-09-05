import FindOneEndpoint from '../../../api/findOne';
import alerts from './alerts';
import { buildPublication } from '../../entities';
import redirect from './redirect';

const REQUEST_URL = '/api/publications/:id';
const endpoint = new FindOneEndpoint({
  data: { publication: buildPublication() },
  middleware: [
    redirect,
    alerts,
  ],
  namespace: 'publications/showFindPublication',
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
