import FormEndpoint from '../../../api/form';
import authorization from '../../../api/middleware/authorization';
import { buildSpell } from '../../entities';
import alerts from './alerts';
import redirect from './redirect';

const namespace = 'spells/updateSpellForm';
const REQUEST_URL = '/api/spells/:id';

const endpoint = new FormEndpoint({
  data: { spell: buildSpell() },
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
