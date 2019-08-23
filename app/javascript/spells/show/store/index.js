import FindOneEndpoint from '../../../api/findOne';
import alerts from './alerts';
import redirect from './redirect';
import { buildSpell } from '../../entities';

const REQUEST_URL = '/api/spells/:id';
const findSpell = new FindOneEndpoint({
  data: { spell: buildSpell() },
  middleware: [
    redirect,
    alerts,
  ],
  namespace: 'findSpell',
  url: REQUEST_URL,
});

export default findSpell;

export const {
  actions,
  namespace,
  reducer,
  request,
} = findSpell;

export { default as useSpell } from '../../store/findSpell/selector';
