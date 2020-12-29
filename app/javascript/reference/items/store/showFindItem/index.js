import showEndpoint from '../../../../api/resources/show';
import { buildItem } from '../../entities';

const endpoint = showEndpoint({
  data: { item: buildItem() },
  namespace: 'reference/items/showFindItem',
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
