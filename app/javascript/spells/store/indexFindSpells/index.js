import FindManyEndpoint from '../../../api/findMany';
import collectAssociations from '../../../api/middleware/collectAssociations';

const collectSources = collectAssociations({
  associationName: 'source',
  associationType: 'hasOne',
  inverseName: 'reference',
  polymorphic: true,
  resourceName: 'spells',
});
const REQUEST_URL = '/api/spells';
const endpoint = new FindManyEndpoint({
  data: { spells: [] },
  middleware: [collectSources],
  namespace: 'spells/indexFindSpells',
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
