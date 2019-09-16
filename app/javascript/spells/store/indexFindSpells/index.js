import FindManyEndpoint from '../../../api/findMany';
import collectAssociations from '../../../api/middleware/collectAssociations';

const REQUEST_URL = '/api/spells';
const endpoint = new FindManyEndpoint({
  data: { spells: [] },
  middleware: [
    collectAssociations({
      associationName: 'source',
      associationType: 'belongsTo',
      polymorphic: true,
      resourceName: 'spells',
    }),
  ],
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
