import submitForm from '../../requests/submitForm';
import { buildSpell } from '../entities';

const namespace = 'createSpell';
const REQUEST_URL = '/api/spells';

export const {
  actions,
  reducer,
  request,
} = submitForm({
  data: { spell: buildSpell() },
  namespace,
  url: REQUEST_URL,
});
