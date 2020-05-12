import FormEndpoint from '../../../../api/form';
import authorization from '../../../../api/middleware/authorization';
import { buildMechanic } from '../../../entities';
import alerts from './alerts';
import redirect from './redirect';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });
const REQUEST_URL = '/api/mechanics/actions';
const endpoint = new FormEndpoint({
  data: { mechanic: buildAction() },
  middleware: [
    authorization,
    redirect,
    alerts,
  ],
  namespace: 'mechanics/actions/createActionForm',
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
