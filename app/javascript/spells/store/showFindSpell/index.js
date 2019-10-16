import FindOneEndpoint from '../../../api/findOne';
import alerts from './alerts';
import { buildSpell } from '../../entities';
import redirect from './redirect';

const REQUEST_URL = '/api/spells/:id';
const endpoint = new FindOneEndpoint({
  data: { spell: buildSpell() },
  middleware: [
    redirect,
    alerts,
  ],
  namespace: 'spells/showFindSpell',
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
