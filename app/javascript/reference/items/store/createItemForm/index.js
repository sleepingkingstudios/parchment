import createFormEndpoint from '../../../../api/resources/createForm';
import { buildItem } from '../../entities';

const endpoint = createFormEndpoint({
  data: { item: buildItem() },
  namespace: 'reference/items/createItemForm',
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
