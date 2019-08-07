import alerts from './alerts';
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
    alerts,
  ],
  namespace,
  url: REQUEST_URL,
});
