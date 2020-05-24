import showEndpoint from '../../../api/resources/show';
import collectAssociations from '../../../api/middleware/collectAssociations';
import { buildSpell } from '../../entities';

const collectSource = collectAssociations({
  associationName: 'source',
  associationType: 'hasOne',
  inverseName: 'reference',
  polymorphic: true,
  resourceName: 'spell',
});
const endpoint = showEndpoint({
  data: { spell: buildSpell() },
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
