import FindOneEndpoint from '../../../api/findOne';
import collectAssociations from '../../../api/middleware/collectAssociations';
import alerts from './alerts';
import { buildSpell } from '../../entities';
import redirect from './redirect';

const REQUEST_URL = '/api/spells/:id';
const collectSource = collectAssociations({
  associationName: 'source',
  associationType: 'hasOne',
  inverseName: 'reference',
  polymorphic: true,
  resourceName: 'spell',
});
const endpoint = new FindOneEndpoint({
  data: { spell: buildSpell() },
  middleware: [
    redirect,
    alerts,
    collectSource,
  ],
  namespace: 'spells/showFindSpell',
  url: REQUEST_URL,
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
