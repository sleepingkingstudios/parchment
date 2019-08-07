import submitForm from '../../../requests/findOne';
import { buildSpell } from '../../entities';

const namespace = 'findSpell';
const REQUEST_URL = '/api/spells';

export const {
  actions,
  reducer,
  request,
} = submitForm({
  data: { spell: buildSpell() },
  middleware: [],
  namespace,
  url: REQUEST_URL,
});
