import createFormEndpoint from '../../../api/resources/createForm';
import { buildBook } from '../../entities';

const endpoint = createFormEndpoint({
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
