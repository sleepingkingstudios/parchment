import updateFindEndpoint from '../../../../api/resources/updateFind';
import { buildItem } from '../../entities';
import formEndpoint from '../updateItemForm';

const endpoint = updateFindEndpoint({
  data: { item: buildItem() },
  formEndpoint,
  namespace: 'reference/items/updateFindItem',
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
