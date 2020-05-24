import deleteEndpoint from '../../../api/resources/delete';

const endpoint = deleteEndpoint({ resourceName: 'spell' });

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
