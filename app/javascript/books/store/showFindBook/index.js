import showEndpoint from '../../../api/resources/show';
import { buildBook } from '../../entities';

const endpoint = showEndpoint({
  data: { book: buildBook() },
  resourceName: 'book',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
