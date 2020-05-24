import updateFindEndpoint from '../../../api/resources/updateFind';
import { buildBook } from '../../entities';
import formEndpoint from '../updateBookForm';

const endpoint = updateFindEndpoint({
  data: { book: buildBook() },
  formEndpoint,
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
