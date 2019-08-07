import alerts from './alerts';
import redirect from './redirect';
import findOne from '../../../requests/findOne';
import { buildSpell } from '../../entities';

const namespace = 'findSpell';
const REQUEST_URL = '/api/spells';

export const {
  actions,
  reducer,
  request,
} = findOne({
  data: { spell: buildSpell() },
  middleware: [
    redirect,
    alerts,
  ],
  namespace,
  url: REQUEST_URL,
});
