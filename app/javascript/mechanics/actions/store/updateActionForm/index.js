import FormEndpoint from '../../../../api/form';
import { buildMechanic } from '../../../entities';
import authorization from '../../../../api/middleware/authorization';
import alerts from './alerts';
import redirect from './redirect';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });
const namespace = 'mechanics/actions/updateActionForm';
const REQUEST_URL = '/api/mechanics/actions/:id';

const endpoint = new FormEndpoint({
  data: { mechanic: buildAction() },
  method: 'PATCH',
  middleware: [
    authorization,
    redirect,
    alerts,
  ],
  namespace,
  url: REQUEST_URL,
});

export default endpoint;

export const {
  actions,
  hooks,
  reducer,
  request,
} = endpoint;
