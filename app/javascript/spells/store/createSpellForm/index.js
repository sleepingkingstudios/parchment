import FormEndpoint from '../../../api/form';
import { buildSpell } from '../../entities';
import alerts from './alerts';
import redirect from './redirect';

const namespace = 'spells/createSpellForm';
const REQUEST_URL = '/api/spells';
const endpoint = new FormEndpoint({
  data: { spell: buildSpell() },
  middleware: [
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
