import buildClient from 'api/client';
import generateAlerts from 'api/middleware/alerts';
import authorization from 'api/middleware/authorization';
import { performRequest } from './find';
import reloadData from './reloadData';

const namespace = 'spells/index/destroy';
const url = 'api/spells/:id';
const alerts = generateAlerts({
  action: 'delete',
  resourceName: 'spell',
  pending: true,
  failure: true,
  success: { alertStyle: 'danger' },
});
const middleware = [
  authorization,
  alerts,
  reloadData({ performRequest }),
];
const client = buildClient({
  method: 'DELETE',
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
