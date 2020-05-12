import FindOneEndpoint from '../../../../api/findOne';
import authorization from '../../../../api/middleware/authorization';
import alerts from './alerts';
import { buildMechanic } from '../../../entities';
import redirect from './redirect';

const REQUEST_URL = '/api/mechanics/actions/:id';
const endpoint = new FindOneEndpoint({
  data: { action: Object.assign(buildMechanic(), { type: 'Action' }) },
  middleware: [
    authorization,
    redirect,
    alerts,
  ],
  namespace: 'mechanics/actions/showFindAction',
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
