import submitForm from '../../requests/submitForm';
import { buildSpell } from '../entities';

const namespace = 'createSpell';
const REQUEST_URL = '/api/spells';

export const {
  actions,
  apiActions,
  reducer,
} = submitForm({ data: { spell: buildSpell() }, namespace, url: REQUEST_URL });
