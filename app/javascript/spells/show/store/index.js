import FindOneEndpoint from '../../../api/findOne';
import alerts from './alerts';
import redirect from './redirect';
import { buildSpell } from '../../entities';
import findSpellRequest from '../../store/findSpell/findSpell';

const REQUEST_URL = '/api/spells/:id';
const endpoint = new FindOneEndpoint({
  data: { spell: buildSpell() },
  middleware: [
    redirect,
    alerts,
  ],
  namespace: 'findSpell',
  url: REQUEST_URL,
});

export default endpoint;

export const {
  actions,
  namespace,
  reducer,
  request,
} = endpoint;

export { default as useSpell } from '../../store/findSpell/useSpell';

const { performRequest } = request;

export const findSpell = findSpellRequest(performRequest);
