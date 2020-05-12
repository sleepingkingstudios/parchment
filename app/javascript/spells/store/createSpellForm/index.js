import FormEndpoint from '../../../api/form';
import { buildSpell } from '../../entities';
import authorization from '../../../api/middleware/authorization';
import alerts from './alerts';
import redirect from './redirect';

const REQUEST_URL = '/api/spells';
const endpoint = new FormEndpoint({
  data: { spell: buildSpell() },
  middleware: [
    authorization,
    redirect,
    alerts,
  ],
  namespace: 'spells/createSpellForm',
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
