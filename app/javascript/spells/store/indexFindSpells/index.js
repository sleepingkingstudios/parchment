import indexEndpoint from '../../../api/resources/index';
import collectAssociations from '../../../api/middleware/collectAssociations';

const collectSources = collectAssociations({
  associationName: 'source',
  associationType: 'hasOne',
  inverseName: 'reference',
  polymorphic: true,
  resourceName: 'spells',
});
const endpoint = indexEndpoint({
  data: { spells: [] },
  middleware: [
    {
      middleware: collectSources,
      after: 'api/authorization',
    },
  ],
  resourceName: 'spells',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
