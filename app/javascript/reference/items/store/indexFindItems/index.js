import indexEndpoint from '../../../../api/resources/index';

const endpoint = indexEndpoint({
  data: { items: [] },
  namespace: 'reference/items/indexFindItems',
  resourceName: 'items',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
