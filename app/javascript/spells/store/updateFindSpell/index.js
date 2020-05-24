import updateFindEndpoint from '../../../api/resources/updateFind';
import collectAssociations from '../../../api/middleware/collectAssociations';
import { buildSpell } from '../../entities';
import formEndpoint from '../updateSpellForm';

const collectSource = collectAssociations({
  associationName: 'source',
  associationType: 'hasOne',
  inverseName: 'reference',
  polymorphic: true,
  resourceName: 'spell',
});
const endpoint = updateFindEndpoint({
  data: { spell: buildSpell() },
  formEndpoint,
  middleware: [
    {
      middleware: collectSource,
      after: 'api/authorization',
    },
  ],
  resourceName: 'spell',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
