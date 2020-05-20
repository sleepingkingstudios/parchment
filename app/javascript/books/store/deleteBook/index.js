import deleteEndpoint from '../../../api/resources/delete';

const endpoint = deleteEndpoint({ resourceName: 'book' });

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
