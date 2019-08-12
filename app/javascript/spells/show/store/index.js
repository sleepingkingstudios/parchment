import alerts from './alerts';
import redirect from './redirect';
import findOne from '../../../requests/findOne';
import { buildSpell } from '../../entities';

const REQUEST_URL = '/api/spells/:id';
const findSpell = findOne({
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
