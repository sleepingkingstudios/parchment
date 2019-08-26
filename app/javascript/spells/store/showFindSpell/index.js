import FindOneEndpoint from '../../../api/findOne';
import alerts from './alerts';
import { buildSpell } from '../../entities';
import findSpellRequest from './requestSpell';
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
  namespace,
  reducer,
  request,
} = endpoint;

export { default as useSpell } from './useSpell';

const { performRequest } = request;

export const requestSpell = findSpellRequest(performRequest);
