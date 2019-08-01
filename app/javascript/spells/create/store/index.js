import submitForm from '../../../requests/submitForm';
import { buildSpell } from '../../entities';
import alerts from './alerts';
import redirect from './redirect';

const namespace = 'createSpell';
const REQUEST_URL = '/api/spells';

export const {
  actions,
  reducer,
  request,
} = submitForm({
  data: { spell: buildSpell() },
  middleware: [
    redirect,
    alerts,
  ],
  namespace,
  url: REQUEST_URL,
});
