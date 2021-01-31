import buildClient from 'api/client';
import generateAlerts from 'api/middleware/alerts';
import authorization from 'api/middleware/authorization';
import collectAssociations from 'api/middleware/collectAssociations';

const namespace = 'spells/index/find';
const url = 'api/spells';
const alerts = generateAlerts({
  action: 'find',
  resourceName: 'spells',
  failure: true,
});
const collectSources = collectAssociations({
  associationName: 'source',
  associationType: 'hasOne',
  inverseName: 'reference',
  polymorphic: true,
  resourceName: 'spells',
});
const middleware = [
  authorization,
  alerts,
  collectSources,
];
const client = buildClient({
  middleware,
  namespace,
  url,
});

export default client;

export const {
  actions,
  hooks,
  reducer,
} = client;
