import submitForm from '../../../../api/form';
import { buildSpell } from '../../../entities';
import alerts from './alerts';
import redirect from './redirect';

const namespace = 'updateSpellForm';
const REQUEST_URL = '/api/spells/:id';

export const {
  actions,
  reducer,
  request,
} = submitForm({
  data: { spell: buildSpell() },
  method: 'PATCH',
  middleware: [
    redirect,
    alerts,
  ],
  namespace,
  url: REQUEST_URL,
});
