import updateFormEndpoint from '../../../../api/resources/updateForm';
import { buildItem } from '../../entities';

const endpoint = updateFormEndpoint({
  data: { item: buildItem() },
  namespace: 'reference/items/updateItemForm',
  resourceName: 'item',
});

export default endpoint;

export const {
  actions,
  hooks,
  reducer,
  request,
} = endpoint;
