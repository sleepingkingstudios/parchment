import deleteEndpoint from '../../../../api/resources/delete';

const endpoint = deleteEndpoint({
  namespace: 'reference/items/deleteItem',
  resourceName: 'item',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
